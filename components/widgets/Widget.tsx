import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { parseInterval } from '../../lib/parseInterval';
import styles from './Widget.module.css';

const RING_R = 6;
const RING_SIZE = 16;
const CX = RING_SIZE / 2;
const CY = RING_SIZE / 2;

function piePath(progress: number): string {
  if (progress <= 0) return '';
  if (progress >= 1) {
    // full circle — SVG arcs can't sweep 360° in one command
    return `M ${CX} ${CY - RING_R} A ${RING_R} ${RING_R} 0 1 1 ${CX - 0.001} ${CY - RING_R} Z`;
  }
  const angle = -Math.PI / 2 + progress * 2 * Math.PI;
  const x = CX + RING_R * Math.cos(angle);
  const y = CY + RING_R * Math.sin(angle);
  const large = progress > 0.5 ? 1 : 0;
  return `M ${CX} ${CY} L ${CX} ${CY - RING_R} A ${RING_R} ${RING_R} 0 ${large} 1 ${x} ${y} Z`;
}

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
  mandatory?: boolean;
  lastUpdated?: number;
  interval?: string;
  onRefresh: () => void;
  onToggleMinimize: () => void;
  onOpenConfig: () => void;
  onClose: () => void;
  onDragStart?: (e: React.PointerEvent) => void;
  children: ReactNode;
}

export default function Widget({ title, minimized, mandatory, lastUpdated, interval, onRefresh, onToggleMinimize, onOpenConfig, onClose, onDragStart, children }: Props) {
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
        <div className={styles.titleLeft}>
          {onDragStart && (
            <button
              className={styles.dragHandle}
              onPointerDown={onDragStart}
              title="Move widget"
              aria-label="Move widget"
            >⠿</button>
          )}
          <div className={styles.titleGroup}>
            <span className={styles.title}>{title}</span>
            {lastUpdated && <span className={styles.timestamp}>{formatAge(lastUpdated)}</span>}
          </div>
        </div>
        <div className={styles.controls}>
          <button className={styles.ringBtn} onClick={onRefresh} title="Refresh" aria-label="Refresh">
            <svg width={RING_SIZE} height={RING_SIZE} style={{ display: 'block' }}>
              <circle cx={CX} cy={CY} r={RING_R} fill="none" stroke="var(--border-default)" strokeWidth={1.5} />
              {intervalMs && progress > 0 && (
                <path d={piePath(progress)} fill="var(--fg-brand)" opacity={0.75} />
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
          {!mandatory && <button className={styles.ctrl} onClick={onClose} title="Close" aria-label="Close">×</button>}
        </div>
      </div>
      {!minimized && <div className={styles.body}>{children}</div>}
    </div>
  );
}
