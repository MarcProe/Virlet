import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';
import { getEntry } from '../components/widgets/WidgetRegistry';
import Widget from '../components/widgets/Widget';
import Sidebar from '../components/sidebar/Sidebar';
import type { WidgetInstance } from '../types/widget';
import styles from './index.module.css';

const NUM_COLUMNS = 3;

export default function Dashboard() {
  const instances = useLiveQuery(() => db.widgets.toArray(), []) ?? [];
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  function openAdd() {
    setEditingId(null);
    setSidebarOpen(true);
  }

  function openConfig(instanceId: string) {
    setEditingId(instanceId);
    setSidebarOpen(true);
  }

  function closeSidebar() {
    setSidebarOpen(false);
    setEditingId(null);
  }

  async function handleSave(
    instanceId: string | null,
    type: string,
    config: Record<string, unknown>,
    x: number
  ) {
    if (instanceId) {
      const inst = instances.find(i => i.id === instanceId);
      if (inst) await db.widgets.put({ ...inst, config, x });
    } else {
      const inCol = instances.filter(i => i.x === x);
      const y = inCol.length > 0 ? Math.max(...inCol.map(i => i.y)) + 1 : 0;
      const next: WidgetInstance = {
        id: crypto.randomUUID(),
        type,
        minimized: false,
        x,
        y,
        config,
      };
      await db.widgets.add(next);
    }
  }

  async function handleClose(instanceId: string) {
    await db.widgets.delete(instanceId);
  }

  async function handleToggleMinimize(instanceId: string) {
    const inst = instances.find(i => i.id === instanceId);
    if (inst) await db.widgets.put({ ...inst, minimized: !inst.minimized });
  }

  const columns: WidgetInstance[][] = Array.from({ length: NUM_COLUMNS }, () => []);
  instances.forEach(inst => {
    columns[Math.min(inst.x, NUM_COLUMNS - 1)].push(inst);
  });
  columns.forEach(col => col.sort((a, b) => a.y !== b.y ? a.y - b.y : a.id.localeCompare(b.id)));

  const isEmpty = instances.length === 0;

  return (
    <div className={styles.dashboard}>
      <header className={styles.topBar}>
        <span className={styles.logo}>Virlet</span>
        <button className={styles.addButton} onClick={openAdd} title="Add widget" aria-label="Add widget">+</button>
      </header>

      <main className={styles.grid}>
        {isEmpty ? (
          <div className={styles.empty}>
            <p className={styles.emptyText}>No widgets yet.</p>
            <p className={styles.emptyHint}>Click <strong>+</strong> to add your first widget.</p>
          </div>
        ) : (
          columns.map((col, colIndex) => (
            <div key={colIndex} className={styles.column}>
              {col.map(inst => {
                const entry = getEntry(inst.type);
                if (!entry) return null;
                const Content = entry.component;
                return (
                  <Widget
                    key={inst.id}
                    title={entry.label}
                    minimized={inst.minimized}
                    onToggleMinimize={() => handleToggleMinimize(inst.id)}
                    onOpenConfig={() => openConfig(inst.id)}
                    onClose={() => handleClose(inst.id)}
                  >
                    <Content config={inst.config} instanceId={inst.id} />
                  </Widget>
                );
              })}
            </div>
          ))
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
