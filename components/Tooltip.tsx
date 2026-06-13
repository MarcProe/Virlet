import { useState, useRef } from 'react';
import type { ReactNode } from 'react';
import styles from './Tooltip.module.css';

interface Props {
  content: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function Tooltip({ content, children, className }: Props) {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);

  function handleMouseEnter() {
    const wrap = wrapRef.current;
    const tip = tipRef.current;
    if (!wrap || !tip) return;

    const tr = wrap.getBoundingClientRect();
    const tw = tip.offsetWidth;
    const th = tip.offsetHeight;
    const MARGIN = 8;

    // prefer centered above the trigger
    let top = tr.top - th - 8;
    let left = tr.left + tr.width / 2 - tw / 2;

    // flip below if overflowing top
    if (top < MARGIN) top = tr.bottom + 8;
    // clamp horizontal
    left = Math.max(MARGIN, Math.min(left, window.innerWidth - tw - MARGIN));
    // clamp vertical
    top = Math.max(MARGIN, Math.min(top, window.innerHeight - th - MARGIN));

    setPos({ top, left });
    setVisible(true);
  }

  const hasContent = content !== null && content !== undefined && content !== '';

  return (
    <div
      ref={wrapRef}
      className={className}
      onMouseEnter={hasContent ? handleMouseEnter : undefined}
      onMouseLeave={hasContent ? () => setVisible(false) : undefined}
    >
      {children}
      {hasContent && (
        <div
          ref={tipRef}
          className={`${styles.tooltip}${visible ? ` ${styles.visible}` : ''}`}
          style={{ top: pos.top, left: pos.left }}
        >
          {content}
        </div>
      )}
    </div>
  );
}
