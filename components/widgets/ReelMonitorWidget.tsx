import { useState, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { ResponsiveContainer, LineChart, Line } from 'recharts';
import { db, type ReelSnapshot } from '../../lib/db';
import type { WidgetContentProps } from '../../types/widget';
import styles from './ReelMonitorWidget.module.css';

interface ReelStats {
  like_count: number;
  comments_count: number;
  timestamp: string;
  thumbnail_url?: string;
  media_url?: string;
  permalink?: string;
}

interface MediaItem {
  id: string;
  media_type: string;
  thumbnail_url?: string;
  media_url?: string;
  timestamp: string;
}

function postAge(ts: string): string {
  const ms = Date.now() - new Date(ts).getTime();
  const h = ms / 3_600_000;
  if (h < 24) return `${Math.floor(h)}h old`;
  const d = h / 24;
  if (d < 7) return `${Math.floor(d)}d old`;
  if (d < 30) return `${Math.floor(d / 7)}w old`;
  return `${Math.floor(d / 30)}mo old`;
}

function fmt(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  return String(n);
}

export default function ReelMonitorWidget({ config, instanceId, refreshKey, onRefreshed, sharedToken }: WidgetContentProps) {
  const token   = sharedToken || (config.token as string | undefined);
  const mediaId = config.mediaId as string | undefined;

  const [reels,   setReels]   = useState<MediaItem[]>([]);
  const [stats,   setStats]   = useState<ReelStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  const snapshots = useLiveQuery<ReelSnapshot[]>(
    () => mediaId
      ? db.reelSnapshots.where('widgetId').equals(instanceId).and(s => s.mediaId === mediaId).sortBy('timestamp')
      : Promise.resolve([] as ReelSnapshot[]),
    [instanceId, mediaId]
  );

  useEffect(() => {
    if (!token) return;
    setError(null);

    if (!mediaId) {
      setLoading(true);
      fetch(`https://graph.instagram.com/me/media?fields=id,media_type,thumbnail_url,media_url,timestamp&limit=50&access_token=${token}`)
        .then(r => r.json())
        .then(data => {
          if (data.error) { setError(data.error.message); setLoading(false); return; }
          setReels((data.data ?? []).filter((m: MediaItem) => m.media_type === 'VIDEO'));
          setLoading(false);
        })
        .catch(() => { setError('Failed to fetch media'); setLoading(false); });
      return;
    }

    setLoading(true);
    fetch(`https://graph.instagram.com/${mediaId}?fields=like_count,comments_count,timestamp,thumbnail_url,media_url,permalink&access_token=${token}`)
      .then(r => r.json())
      .then(async data => {
        if (data.error) { setError(data.error.message); setLoading(false); return; }
        setStats(data);
        setLoading(false);
        onRefreshed();
        await db.reelSnapshots.add({
          widgetId: instanceId,
          mediaId,
          timestamp: Date.now(),
          likeCount: data.like_count ?? 0,
          commentsCount: data.comments_count ?? 0,
        });
      })
      .catch(() => { setError('Failed to fetch reel'); setLoading(false); });
  }, [token, mediaId, refreshKey]); // eslint-disable-line react-hooks/exhaustive-deps

  async function selectReel(id: string) {
    const inst = await db.widgets.get(instanceId);
    if (!inst) return;
    await db.widgets.update(instanceId, { config: { ...inst.config, mediaId: id } });
  }

  async function changeReel() {
    const inst = await db.widgets.get(instanceId);
    if (!inst) return;
    const next = { ...inst.config };
    delete next.mediaId;
    await db.widgets.update(instanceId, { config: next });
    setStats(null);
  }

  if (!token) return <p className={styles.hint}>Add the Profile widget and enter a token first.</p>;

  if (!mediaId) {
    if (loading) return <p className={styles.loading}>Loading reels…</p>;
    if (error)   return <p className={styles.error}>{error}</p>;
    if (!reels.length) return <p className={styles.hint}>No video posts found.</p>;
    return (
      <div className={styles.picker}>
        <p className={styles.pickerHint}>Select a reel to monitor</p>
        <div className={styles.thumbGrid}>
          {reels.map(r => {
            const src = r.thumbnail_url ?? r.media_url;
            return (
              <button key={r.id} className={styles.thumb} onClick={() => selectReel(r.id)}>
                {src && <img src={src} alt="" className={styles.thumbImg} />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (loading && !stats) return <p className={styles.loading}>Loading reel…</p>;
  if (error)  return <p className={styles.error}>{error}</p>;
  if (!stats) return <p className={styles.hint}>No data.</p>;

  const imgSrc    = stats.thumbnail_url ?? stats.media_url;
  const sparkData = (snapshots ?? []).map(s => ({ v: s.likeCount }));

  return (
    <div className={styles.wrap}>
      {imgSrc && (
        <a href={stats.permalink} target="_blank" rel="noopener noreferrer" className={styles.imgLink}>
          <img src={imgSrc} alt="Reel thumbnail" className={styles.poster} />
        </a>
      )}

      <div className={styles.meta}>
        <span className={styles.age}>{postAge(stats.timestamp)}</span>
        <button className={styles.changeBtn} onClick={changeReel}>change reel</button>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{fmt(stats.like_count)}</span>
          <span className={styles.statLabel}>Likes</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <span className={styles.statValue}>{fmt(stats.comments_count)}</span>
          <span className={styles.statLabel}>Comments</span>
        </div>
      </div>

      {sparkData.length >= 2 && (
        <div className={styles.sparkWrap}>
          <span className={styles.sparkLabel}>Likes over time ({sparkData.length} snapshots)</span>
          <ResponsiveContainer width="100%" height={52}>
            <LineChart data={sparkData} margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
              <Line
                type="monotone"
                dataKey="v"
                stroke="var(--primary)"
                strokeWidth={1.5}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
