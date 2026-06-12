import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { parseInterval } from '../../lib/parseInterval';
import styles from './Widget.module.css';

const RING_R = 6;
const RING_SIZE = 16;
const CIRC = 2 * Math.PI * RING_R;

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
  interval?: string;
  onRefresh: () => void;
  onToggleMinimize: () => void;
  onOpenConfig: () => void;
  onClose: () => void;
  children: ReactNode;
}

export default function Widget({ title, minimized, lastUpdated, interval, onRefresh, onToggleMinimize, onOpenConfig, onClose, children }: Props) {
  const intervalMs = interval ? parseInterval(interval) : null;
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!intervalMs) return;
    const stepMs = Math.max(Math.floor(intervalMs / 24), 250);
    const id = setInterval(() => setTick(t => t + 1), stepMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  let progress = 0;
  if (intervalMs && lastUpdated) {
    const raw = Math.min((Date.now() - lastUpdated) / intervalMs, 1);
    progress = Math.floor(raw * 24) / 24;
  }

  return (
    <div className={styles.widget}>
      <div className={styles.titleBar}>
        <div className={styles.titleGroup}>
          <span className={styles.title}>{title}</span>
          {lastUpdated && <span className={styles.timestamp}>{formatAge(lastUpdated)}</span>}
        </div>
        <div className={styles.controls}>
          <button className={styles.ringBtn} onClick={onRefresh} title="Refresh" aria-label="Refresh">
            <svg
              width={RING_SIZE}
              height={RING_SIZE}
              style={{ transform: 'rotate(-90deg)', display: 'block' }}
            >
              <circle
                cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={RING_R}
                fill="none"
                stroke="var(--border-default)"
                strokeWidth={2}
              />
              {intervalMs && (
                <circle
                  cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={RING_R}
                  fill="none"
                  stroke="var(--fg-brand)"
                  strokeWidth={2}
                  strokeDasharray={CIRC}
                  strokeDashoffset={CIRC * (1 - progress)}
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
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
