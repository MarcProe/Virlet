import { useState, useEffect, useRef } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';
import { getEntry } from '../components/widgets/WidgetRegistry';
import Widget from '../components/widgets/Widget';
import Sidebar from '../components/sidebar/Sidebar';
import { parseInterval } from '../lib/parseInterval';
import type { WidgetInstance } from '../types/widget';
import styles from './index.module.css';

const NUM_COLUMNS = 10;

export default function Dashboard() {
  const instances = useLiveQuery(() => db.widgets.toArray(), []) ?? [];
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [refreshKeys, setRefreshKeys] = useState<Record<string, number>>({});
  const intervalRefs = useRef<Record<string, ReturnType<typeof setInterval>>>({});

  useEffect(() => {
    Object.values(intervalRefs.current).forEach(clearInterval);
    intervalRefs.current = {};
    instances.forEach(inst => {
      if (!inst.interval) return;
      const ms = parseInterval(inst.interval);
      if (!ms) return;
      intervalRefs.current[inst.id] = setInterval(() => {
        setRefreshKeys(prev => ({ ...prev, [inst.id]: (prev[inst.id] ?? 0) + 1 }));
      }, ms);
    });
    return () => { Object.values(intervalRefs.current).forEach(clearInterval); };
  }, [instances]);

  function openAdd() { setEditingId(null); setSidebarOpen(true); }
  function openConfig(id: string) { setEditingId(id); setSidebarOpen(true); }
  function closeSidebar() { setSidebarOpen(false); setEditingId(null); }

  function handleRefresh(instanceId: string) {
    setRefreshKeys(prev => ({ ...prev, [instanceId]: (prev[instanceId] ?? 0) + 1 }));
  }

  async function handleRefreshed(instanceId: string) {
    const inst = instances.find(i => i.id === instanceId);
    if (inst) await db.widgets.put({ ...inst, lastUpdated: Date.now() });
  }

  async function handleSave(
    instanceId: string | null,
    type: string,
    config: Record<string, unknown>,
    x: number,
    colSpan: number,
    interval: string
  ) {
    if (instanceId) {
      const inst = instances.find(i => i.id === instanceId);
      if (inst) await db.widgets.put({ ...inst, config, x, colSpan, interval: interval || undefined });
    } else {
      const y = instances.length > 0 ? Math.max(...instances.map(i => i.y)) + 1 : 0;
      await db.widgets.add({
        id: crypto.randomUUID(),
        type,
        minimized: false,
        x,
        y,
        colSpan,
        config,
        interval: interval || undefined,
      });
    }
  }

  async function handleClose(instanceId: string) {
    await db.widgets.delete(instanceId);
  }

  async function handleToggleMinimize(instanceId: string) {
    const inst = instances.find(i => i.id === instanceId);
    if (inst) await db.widgets.put({ ...inst, minimized: !inst.minimized });
  }

  const sorted = [...instances].sort((a, b) => a.y !== b.y ? a.y - b.y : a.x - b.x);

  return (
    <div className={styles.dashboard}>
      <header className={styles.topBar}>
        <span className={styles.logo}>Virlet</span>
        <button className={styles.addButton} onClick={openAdd} title="Add widget" aria-label="Add widget">+</button>
      </header>

      <main className={styles.grid}>
        {instances.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.emptyText}>No widgets yet.</p>
            <p className={styles.emptyHint}>Click <strong>+</strong> to add your first widget.</p>
          </div>
        ) : (
          sorted.map(inst => {
            const entry = getEntry(inst.type);
            if (!entry) return null;
            const Content = entry.component;
            const colStart = Math.min(inst.x + 1, NUM_COLUMNS);
            const colSpan = Math.min(inst.colSpan ?? 1, NUM_COLUMNS - inst.x);
            return (
              <div key={inst.id} style={{ gridColumn: `${colStart} / span ${colSpan}` }}>
                <Widget
                  title={entry.label}
                  minimized={inst.minimized}
                  lastUpdated={inst.lastUpdated}
                  interval={inst.interval}
                  onRefresh={() => handleRefresh(inst.id)}
                  onToggleMinimize={() => handleToggleMinimize(inst.id)}
                  onOpenConfig={() => openConfig(inst.id)}
                  onClose={() => handleClose(inst.id)}
                >
                  <Content
                    config={inst.config}
                    instanceId={inst.id}
                    refreshKey={refreshKeys[inst.id] ?? 0}
                    onRefreshed={() => handleRefreshed(inst.id)}
                  />
                </Widget>
              </div>
            );
          })
        )}
      </main>

      <Sidebar
        open={sidebarOpen}
        instances={instances}
        editingInstanceId={editingId}
        onClose={closeSidebar}
        onSave={handleSave}
      />
    </div>
  );
}
