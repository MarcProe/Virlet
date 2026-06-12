import Link from 'next/link';

export default function Custom404() {
  return (
    <main style={styles.main}>
      <div style={styles.card}>
        <h1 style={styles.heading}>404</h1>
        <p style={styles.message}>Page not found</p>
        <Link href="/" style={styles.link}>
          Go back home
        </Link>
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
    fontSize: '3rem',
    marginBottom: '8px',
    color: 'var(--primary)',
  },
  message: {
    fontSize: '1.25rem',
    color: 'var(--body)',
    marginBottom: '24px',
  },
  link: {
    display: 'inline-block',
    padding: '12px 24px',
    backgroundColor: 'var(--surface)',
    color: 'var(--fg-brand)',
    borderRadius: '8px',
    boxShadow: 'var(--shadow-sm)',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'box-shadow 0.2s ease',
  },
};
