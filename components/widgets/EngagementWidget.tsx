import { useState, useEffect } from 'react';
import {
  ResponsiveContainer, ComposedChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import type { WidgetContentProps } from '../../types/widget';
import styles from './EngagementWidget.module.css';

interface Post {
  id: string;
  like_count: number;
  comments_count: number;
  timestamp: string;
  media_url?: string;
  thumbnail_url?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
}

interface ChartPoint {
  index: number;
  date: string;
  value: number;
  trend: number;
  post: Post;
  isHighlighted: boolean;
}

function linReg(ys: number[]): (x: number) => number {
  const n = ys.length;
  if (n < 2) return () => ys[0] ?? 0;
  const sumX = (n * (n - 1)) / 2;
  const sumX2 = (n * (n - 1) * (2 * n - 1)) / 6;
  const sumY = ys.reduce((s, y) => s + y, 0);
  const sumXY = ys.reduce((s, y, i) => s + i * y, 0);
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  return (x: number) => slope * x + intercept;
}

function fmtDate(ts: string): string {
  const d = new Date(ts);
  return `${d.toLocaleString('default', { month: 'short' })} ${d.getDate()}`;
}

function calcValue(post: Post, metric: string, followers: number): number {
  const interactions = (post.like_count ?? 0) + (post.comments_count ?? 0);
  if (metric === 'engagement') return followers > 0 ? (interactions / followers) * 100 : 0;
  if (metric === 'interactions') return interactions;
  if (metric === 'likes') return post.like_count ?? 0;
  if (metric === 'comments') return post.comments_count ?? 0;
  return 0;
}

function fmtVal(n: number, metric: string): string {
  return metric === 'engagement' ? `${n.toFixed(2)}%` : String(Math.round(n));
}

function metricLabel(metric: string): string {
  if (metric === 'engagement') return 'Eng. rate';
  if (metric === 'interactions') return 'Interactions';
  if (metric === 'likes') return 'Likes';
  if (metric === 'comments') return 'Comments';
  return '';
}

// defined outside component to avoid recharts re-render issues
function renderDot(props: Record<string, unknown>): React.ReactElement {
  const { cx, cy, payload, index } = props as { cx: number; cy: number; payload: ChartPoint; index: number };
  if (payload.isHighlighted) {
    return <circle key={index} cx={cx} cy={cy} r={6} fill="var(--primary)" stroke="var(--surface)" strokeWidth={2} />;
  }
  return <circle key={index} cx={cx} cy={cy} r={3} fill="var(--fg-brand)" fillOpacity={0.65} />;
}

function TooltipContent({ active, payload, metric }: { active?: boolean; payload?: { payload: ChartPoint }[]; metric: string }) {
  if (!active || !payload?.[0]) return null;
  const pt = payload[0].payload;
  const imgSrc = pt.post.media_type === 'VIDEO' ? pt.post.thumbnail_url : pt.post.media_url;
  return (
    <div className={styles.tooltip}>
      {imgSrc && <img src={imgSrc} alt="" className={styles.tooltipImg} />}
      <div className={styles.tooltipBody}>
        <span className={styles.tooltipDate}>{pt.date}</span>
        <span className={styles.tooltipValue}>{fmtVal(pt.value, metric)}</span>
        <span className={styles.tooltipSub}>♥ {pt.post.like_count ?? 0} · 💬 {pt.post.comments_count ?? 0}</span>
      </div>
    </div>
  );
}

export default function EngagementWidget({ config, refreshKey, onRefreshed }: WidgetContentProps) {
  const token      = config.token as string | undefined;
  const postCount  = Math.min(100, Math.max(5, parseInt(config.postCount as string) || 50));
  const hlCount    = Math.min(10, Math.max(0, parseInt(config.highlightCount as string) || 3));
  const metric     = (config.metric as string) || 'engagement';
  const showTrend  = config.showTrendLine !== 'false';

  const [points, setPoints]   = useState<ChartPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    if (!token) { setPoints([]); setError(null); return; }
    setLoading(true);
    setError(null);

    Promise.all([
      fetch(`https://graph.instagram.com/me?fields=followers_count&access_token=${token}`).then(r => r.json()),
      fetch(`https://graph.instagram.com/me/media?fields=id,like_count,comments_count,timestamp,media_url,thumbnail_url,media_type&limit=${postCount}&access_token=${token}`).then(r => r.json()),
    ])
      .then(([profile, media]) => {
        if (profile.error) { setError(profile.error.message); setLoading(false); return; }
        if (media.error)   { setError(media.error.message);   setLoading(false); return; }

        const posts: Post[] = ([...(media.data ?? [])]).reverse();
        const followers: number = profile.followers_count ?? 0;
        const values = posts.map(p => calcValue(p, metric, followers));
        const trendFn = linReg(values);

        const sorted = values.map((v, i) => ({ v, i })).sort((a, b) => b.v - a.v);
        const topIdx = new Set(sorted.slice(0, hlCount).map(x => x.i));

        setPoints(posts.map((post, i) => ({
          index: i,
          date: fmtDate(post.timestamp),
          value: parseFloat(values[i].toFixed(3)),
          trend: parseFloat(trendFn(i).toFixed(3)),
          post,
          isHighlighted: topIdx.has(i),
        })));
        setLoading(false);
        onRefreshed();
      })
      .catch(() => { setError('Failed to fetch data'); setLoading(false); });
  }, [token, postCount, hlCount, metric, refreshKey]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!token)          return <p className={styles.hint}>Open settings to add an access token.</p>;
  if (loading)         return <p className={styles.loading}>Fetching {postCount} posts…</p>;
  if (error)           return <p className={styles.error}>{error}</p>;
  if (!points.length)  return <p className={styles.hint}>No posts found.</p>;

  const avg        = points.reduce((s, p) => s + p.value, 0) / points.length;
  const last5      = points.slice(-5);
  const prev5      = points.length >= 10 ? points.slice(-10, -5) : points.slice(0, 5);
  const last5Avg   = last5.reduce((s, p) => s + p.value, 0) / last5.length;
  const prev5Avg   = prev5.reduce((s, p) => s + p.value, 0) / prev5.length;
  const trendUp    = last5Avg >= prev5Avg;
  const trendPct   = prev5Avg > 0 ? Math.abs((last5Avg - prev5Avg) / prev5Avg * 100) : 0;
  const peak       = Math.max(...points.map(p => p.value));

  const yLabel = metric === 'engagement' ? (v: number) => `${v.toFixed(1)}%` : (v: number) => String(Math.round(v));
  const yWidth = metric === 'engagement' ? 44 : 52;

  return (
    <div className={styles.wrap}>
      <div className={styles.summary}>
        <div className={styles.summaryItem}>
          <span className={styles.summaryValue}>{fmtVal(avg, metric)}</span>
          <span className={styles.summaryLabel}>Avg {metricLabel(metric)}</span>
        </div>
        <div className={styles.summaryDivider} />
        <div className={styles.summaryItem}>
          <span className={`${styles.summaryValue} ${trendUp ? styles.up : styles.down}`}>
            {trendUp ? '↑' : '↓'} {trendPct.toFixed(1)}%
          </span>
          <span className={styles.summaryLabel}>Last 5 vs prev 5</span>
        </div>
        <div className={styles.summaryDivider} />
        <div className={styles.summaryItem}>
          <span className={styles.summaryValue}>{fmtVal(peak, metric)}</span>
          <span className={styles.summaryLabel}>Peak</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={190}>
        <ComposedChart data={points} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fontFamily: 'var(--font-jetbrains, monospace)', fill: 'var(--body-subtle)' }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 10, fontFamily: 'var(--font-jetbrains, monospace)', fill: 'var(--body-subtle)' }}
            tickLine={false}
            axisLine={false}
            width={yWidth}
            tickFormatter={yLabel}
          />
          <Tooltip content={(props) => <TooltipContent {...(props as unknown as Parameters<typeof TooltipContent>[0])} metric={metric} />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--fg-brand)"
            strokeWidth={2}
            dot={renderDot as never}
            activeDot={{ r: 7, fill: 'var(--primary)' }}
            isAnimationActive={false}
          />
          {showTrend && (
            <Line
              type="monotone"
              dataKey="trend"
              stroke="var(--body-subtle)"
              strokeWidth={1.5}
              strokeDasharray="5 4"
              dot={false}
              activeDot={false}
              isAnimationActive={false}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
