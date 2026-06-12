import type { ReactNode } from 'react';
import styles from './Widget.module.css';

interface Props {
  title: string;
  minimized: boolean;
  onToggleMinimize: () => void;
  onOpenConfig: () => void;
  onClose: () => void;
  children: ReactNode;
}

export default function Widget({ title, minimized, onToggleMinimize, onOpenConfig, onClose, children }: Props) {
  return (
    <div className={styles.widget}>
      <div className={styles.titleBar}>
        <span className={styles.title}>{title}</span>
        <div className={styles.controls}>
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
