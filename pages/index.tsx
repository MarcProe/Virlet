import { useState, useEffect } from 'react';
import Image from 'next/image';
import CenteredCard from '../components/CenteredCard';
import styles from './index.module.css';

const TOKEN_KEY = 'ig_token';

interface Profile {
  id: string;
  username: string;
  name: string;
  biography: string;
  followers_count: number;
  media_count: number;
  profile_picture_url: string;
  website: string;
}

function fmt(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  return String(n);
}

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (stored) setToken(stored);
  }, []);

  useEffect(() => {
    if (!token) { setProfile(null); return; }
    fetch(
      `https://graph.instagram.com/me?fields=id,username,name,biography,followers_count,media_count,profile_picture_url,website&access_token=${token}`
    )
      .then(r => r.json())
      .then(data => {
        if (data.error) {
          setError(data.error.message);
          setToken(null);
          localStorage.removeItem(TOKEN_KEY);
        } else {
          setProfile(data);
        }
      })
      .catch(() => setError('Failed to reach Instagram API'));
  }, [token]);

  function save() {
    const t = input.trim();
    if (!t) return;
    localStorage.setItem(TOKEN_KEY, t);
    setInput('');
    setError(null);
    setToken(t);
  }

  function clear() {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setProfile(null);
    setError(null);
  }

  return (
    <CenteredCard>
      <h1 className={styles.heading}>Virlet</h1>

      {!token && (
        <>
          <input
            className={styles.input}
            type="password"
            placeholder="Paste Instagram access token"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && save()}
          />
          {error && <p className={styles.error}>{error}</p>}
          <button className={styles.button} onClick={save}>Connect</button>
        </>
      )}

      {token && !profile && !error && (
        <p className={styles.loading}>Loading profile…</p>
      )}

      {profile && (
        <div className={styles.profile}>
          {profile.profile_picture_url && (
            <Image
              className={styles.avatar}
              src={profile.profile_picture_url}
              alt={profile.username}
              width={88}
              height={88}
              unoptimized
            />
          )}
          <div className={styles.names}>
            {profile.name && <span className={styles.name}>{profile.name}</span>}
            <span className={styles.handle}>@{profile.username}</span>
          </div>
          {profile.biography && (
            <p className={styles.bio}>{profile.biography}</p>
          )}
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
          {profile.website && (
            <a
              className={styles.website}
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              {profile.website.replace(/^https?:\/\//, '')}
            </a>
          )}
          <button className={styles.button} onClick={clear}>Disconnect</button>
        </div>
      )}
    </CenteredCard>
  );
}
