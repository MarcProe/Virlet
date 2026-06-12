import Link from 'next/link';
import CenteredCard from '../components/CenteredCard';
import styles from './404.module.css';

export default function Custom404() {
  return (
    <CenteredCard>
      <h1 className={styles.heading}>404</h1>
      <p className={styles.message}>Page not found</p>
      <Link href="/" className={styles.link}>
        Go back home
      </Link>
    </CenteredCard>
  );
}
