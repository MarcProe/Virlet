import { useState, useEffect } from 'react';
import CenteredCard from '../components/CenteredCard';
import styles from './index.module.css';

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
    <CenteredCard>
      <h1 className={styles.heading}>HELLO WORLD</h1>
      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : (
        <p className={styles.message}>{apiMessage}</p>
      )}
    </CenteredCard>
  );
}
