import type { ReactNode } from 'react';
import styles from './Widget.module.css';

function formatAge(ts: number): string {
  const diff = Date.now() - ts;
  if (diff < 60_000) return 'just now';
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return new Date(ts).toLocaleDateString();
}

interface Props {
  title: string;
  minimized: boolean;
  lastUpdated?: number;
  onRefresh: () => void;
  onToggleMinimize: () => void;
  onOpenConfig: () => void;
  onClose: () => void;
  children: ReactNode;
}

export default function Widget({ title, minimized, lastUpdated, onRefresh, onToggleMinimize, onOpenConfig, onClose, children }: Props) {
  return (
    <div className={styles.widget}>
      <div className={styles.titleBar}>
        <div className={styles.titleGroup}>
          <span className={styles.title}>{title}</span>
          {lastUpdated && <span className={styles.timestamp}>{formatAge(lastUpdated)}</span>}
        </div>
        <div className={styles.controls}>
          <button className={styles.ctrl} onClick={onRefresh} title="Refresh" aria-label="Refresh">↻</button>
          <button className={styles.ctrl} onClick={onOpenConfig} title="Settings" aria-label="Settings">⚙</button>
          <button
            className={styles.ctrl}
            onClick={onToggleMinimize}
            title={minimized ? 'Expand' : 'Minimize'}
            aria-label={minimized ? 'Expand' : 'Minimize'}
          >
            {minimized ? '▲' : '▼'}
          </button>
          <button className={styles.ctrl} onClick={onClose} title="Close" aria-label="Close">×</button>
        </div>
      </div>
      {!minimized && <div className={styles.body}>{children}</div>}
    </div>
  );
}
