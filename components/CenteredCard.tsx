import type { ReactNode } from 'react';
import styles from './CenteredCard.module.css';

export default function CenteredCard({ children }: { children: ReactNode }) {
  return (
    <main className={styles.main}>
      <div className={styles.card}>{children}</div>
    </main>
  );
}
