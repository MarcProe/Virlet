import styles from './CenteredCard.module.css';

export default function CenteredCard({ children }) {
  return (
    <main className={styles.main}>
      <div className={styles.card}>{children}</div>
    </main>
  );
}
