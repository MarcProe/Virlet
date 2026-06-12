import { useState, useEffect } from 'react';
import Image from 'next/image';
import { db } from '../../lib/db';
import type { WidgetContentProps } from '../../types/widget';
import styles from './ProfileWidget.module.css';

interface Profile {
  id: string;
  username: string;
  name: string;
  biography: string;
  followers_count: number;
  media_count: number;
  profile_picture_url: string;
}

function fmt(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  return String(n);
}

export default function ProfileWidget({ config, instanceId, refreshKey, onRefreshed }: WidgetContentProps) {
  const token = config.token as string | undefined;
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) { setProfile(null); setError(null); return; }
    setError(null);
    fetch(
      `https://graph.instagram.com/me?fields=id,username,name,biography,followers_count,media_count,profile_picture_url&access_token=${token}`
    )
      .then(r => r.json())
      .then(data => {
        if (data.error) setError(data.error.message);
        else { setProfile(data); onRefreshed(); }
      })
      .catch(() => setError('Failed to reach Instagram API'));
  }, [token, refreshKey]); // eslint-disable-line react-hooks/exhaustive-deps

  async function logout() {
    const inst = await db.widgets.get(instanceId);
    if (!inst) return;
    const { token: _, ...rest } = inst.config;
    await db.widgets.update(instanceId, { config: rest });
    setProfile(null);
  }

  if (!token) return <p className={styles.hint}>Open settings to add an access token.</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!profile) return <p className={styles.loading}>Loading…</p>;

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.avatarWrap}>
          {profile.profile_picture_url && (
            <Image
              className={styles.avatar}
              src={profile.profile_picture_url}
              alt={profile.username}
              width={56}
              height={56}
              unoptimized
            />
          )}
          {profile.biography && (
            <div className={styles.bioTooltip}>{profile.biography}</div>
          )}
        </div>
        <div className={styles.identity}>
          {profile.name && <span className={styles.name}>{profile.name}</span>}
          <span className={styles.handle}>@{profile.username}</span>
        </div>
        <button className={styles.logout} onClick={logout} title="Log out">↪</button>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{fmt(profile.followers_count)}</span>
          <span className={styles.statLabel}>Followers</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <span className={styles.statValue}>{fmt(profile.media_count)}</span>
          <span className={styles.statLabel}>Posts</span>
        </div>
      </div>
    </div>
  );
}
