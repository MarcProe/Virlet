import { useState, useEffect } from 'react';
import CenteredCard from '../components/CenteredCard';
import styles from './index.module.css';

const TOKEN_KEY = 'ig_token';

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [username, setUsername] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (stored) setToken(stored);
  }, []);

  useEffect(() => {
    if (!token) { setUsername(null); return; }
    fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${token}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) {
          setError(data.error.message);
          setToken(null);
          localStorage.removeItem(TOKEN_KEY);
        } else {
          setUsername(data.username);
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
    setUsername(null);
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
      {token && !username && !error && (
        <p className={styles.loading}>Verifying token…</p>
      )}
      {token && username && (
        <>
          <p className={styles.message}>Connected as @{username}</p>
          <button className={styles.button} onClick={clear}>Disconnect</button>
        </>
      )}
    </CenteredCard>
  );
}
