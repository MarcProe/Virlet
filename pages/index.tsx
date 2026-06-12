import { useSession, signIn, signOut } from 'next-auth/react';
import CenteredCard from '../components/CenteredCard';
import styles from './index.module.css';

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <CenteredCard>
      <h1 className={styles.heading}>Virlet</h1>
      {status === 'loading' && <p className={styles.loading}>Loading...</p>}
      {status === 'unauthenticated' && (
        <button className={styles.message} onClick={() => signIn('instagram')}>
          Sign in with Instagram
        </button>
      )}
      {status === 'authenticated' && (
        <>
          <p className={styles.message}>Signed in as @{session.user?.name}</p>
          <button className={styles.message} onClick={() => signOut()}>
            Sign out
          </button>
        </>
      )}
    </CenteredCard>
  );
}
