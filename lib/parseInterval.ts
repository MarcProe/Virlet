export function parseInterval(s: string): number | null {
  const m = s.trim().match(/^(\d{1,5}) ?([smh])$/);
  if (!m) return null;
  const n = parseInt(m[1], 10);
  if (n === 0) return null;
  if (m[2] === 's') return n * 1_000;
  if (m[2] === 'm') return n * 60_000;
  return n * 3_600_000;
}
