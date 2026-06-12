import { useState, useEffect } from 'react';
import CenteredCard from '../components/CenteredCard';
import styles from './index.module.css';

type ApiState =
  | { status: 'loading' }
  | { status: 'success'; message: string }
  | { status: 'error' };

export default function Home() {
  const [state, setState] = useState<ApiState>({ status: 'loading' });

  useEffect(() => {
    fetch('/api/helloworld')
      .then((res) => res.json())
      .then((data: { message: string }) => setState({ status: 'success', message: data.message }))
      .catch(() => setState({ status: 'error' }));
  }, []);

  return (
    <CenteredCard>
      <h1 className={styles.heading}>HELLO WORLD</h1>
      {state.status === 'loading' && <p className={styles.loading}>Loading...</p>}
      {state.status === 'success' && <p className={styles.message}>{state.message}</p>}
      {state.status === 'error' && <p className={styles.message}>Failed to load</p>}
    </CenteredCard>
  );
}
