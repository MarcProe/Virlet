import { useState, useEffect } from 'react';

export default function Home() {
  const [apiMessage, setApiMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/helloworld')
      .then((res) => res.json())
      .then((data) => {
        setApiMessage(data.message);
        setLoading(false);
      })
      .catch(() => {
        setApiMessage('API Error');
        setLoading(false);
      });
  }, []);

  return (
    <main style={styles.main}>
      <div style={styles.card}>
        <h1 style={styles.heading}>HELLO WORLD</h1>
        {loading ? (
          <p style={styles.loading}>Loading...</p>
        ) : (
          <p style={styles.message}>{apiMessage}</p>
        )}
      </div>
    </main>
  );
}

const styles = {
  main: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  },
  card: {
    backgroundColor: 'var(--surface)',
    padding: '48px',
    borderRadius: '8px',
    boxShadow: 'var(--shadow-md)',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '16px',
  },
  message: {
    fontSize: '1rem',
    color: 'var(--body)',
  },
  loading: {
    fontSize: '1rem',
    color: 'var(--body-subtle)',
  },
};
