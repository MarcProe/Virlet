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

type DragState = {
  widgetId: string;
  pointerX: number;
  pointerY: number;
  offsetX: number;
  offsetY: number;
};

type RenderItem =
  | { kind: 'widget'; inst: WidgetInstance }
  | { kind: 'dropzone'; col: number; colSpan: number };

export default function Dashboard() {
  const rawInstances = useLiveQuery(() => db.widgets.toArray(), []);
  const instances = rawInstances ?? [];
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [refreshKeys, setRefreshKeys] = useState<Record<string, number>>({});
  const intervalRefs = useRef<Record<string, ReturnType<typeof setInterval>>>({});

  const [dragState, setDragState] = useState<DragState | null>(null);
  const [dropTarget, setDropTarget] = useState<{ col: number; yIndex: number } | null>(null);

  const gridRef = useRef<HTMLElement>(null);
  const cellRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const dragStateRef = useRef<DragState | null>(null);
  const dropTargetRef = useRef<{ col: number; yIndex: number } | null>(null);
  const sortedRef = useRef<WidgetInstance[]>([]);
  const instancesRef = useRef<WidgetInstance[]>([]);

  const sorted = [...instances].sort((a, b) => a.y !== b.y ? a.y - b.y : a.x - b.x);

  dragStateRef.current = dragState;
  dropTargetRef.current = dropTarget;
  sortedRef.current = sorted;
  instancesRef.current = instances;

  // Auto-seed mandatory profile widget on first load
  useEffect(() => {
    if (rawInstances === undefined) return;
    if (rawInstances.some(i => i.type === 'profile')) return;
    db.widgets.add({
      id: crypto.randomUUID(),
      type: 'profile',
      minimized: false,
      x: 0,
      y: 0,
      colSpan: 2,
      config: {},
    });
  }, [rawInstances === undefined]); // eslint-disable-line react-hooks/exhaustive-deps

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

  useEffect(() => {
    if (!dragState) return;

    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';

    function calcDropTarget(clientX: number, clientY: number) {
      const grid = gridRef.current;
      const ds = dragStateRef.current;
      if (!grid || !ds) return;

      const gridRect = grid.getBoundingClientRect();
      const colWidth = gridRect.width / NUM_COLUMNS;
      const dragged = instancesRef.current.find(i => i.id === ds.widgetId);
      if (!dragged) return;

      const colSpan = dragged.colSpan ?? 1;
      const rawCol = Math.floor((clientX - gridRect.left) / colWidth);
      const col = Math.max(0, Math.min(NUM_COLUMNS - colSpan, rawCol));

      const others = sortedRef.current.filter(i => i.id !== ds.widgetId);
      let yIndex = others.length;
      for (let i = 0; i < others.length; i++) {
        const el = cellRefs.current.get(others[i].id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (clientY < rect.top + rect.height / 2) {
          yIndex = i;
          break;
        }
      }
      setDropTarget({ col, yIndex });
    }

    function onMove(e: PointerEvent) {
      setDragState(prev => prev ? { ...prev, pointerX: e.clientX, pointerY: e.clientY } : null);
      calcDropTarget(e.clientX, e.clientY);
    }

    async function onUp() {
      const ds = dragStateRef.current;
      const dt = dropTargetRef.current;
      if (ds && dt) {
        const dragged = instancesRef.current.find(i => i.id === ds.widgetId);
        if (dragged) {
          const others = sortedRef.current.filter(i => i.id !== ds.widgetId);
          const newOrder = [...others];
          newOrder.splice(dt.yIndex, 0, dragged);
          await Promise.all(
            newOrder.map((inst, idx) => {
              const newX = inst.id === dragged.id ? dt.col : inst.x;
              if (inst.x === newX && inst.y === idx) return Promise.resolve();
              return db.widgets.put({ ...inst, x: newX, y: idx });
            })
          );
        }
      }
      setDragState(null);
      setDropTarget(null);
    }

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [dragState !== null]); // eslint-disable-line react-hooks/exhaustive-deps

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

  function handleDragStart(widgetId: string, e: React.PointerEvent) {
    e.preventDefault();
    const cellEl = cellRefs.current.get(widgetId);
    const rect = cellEl?.getBoundingClientRect();
    setDragState({
      widgetId,
      pointerX: e.clientX,
      pointerY: e.clientY,
      offsetX: rect ? e.clientX - rect.left : 0,
      offsetY: rect ? e.clientY - rect.top : 0,
    });
  }

  const sharedToken = (instances.find(i => i.type === 'profile')?.config.token as string | undefined) ?? '';

  const isDragging = dragState !== null;

  // Build render list: during drag, show a drop-zone placeholder at the target position
  // and the dragged widget at its original position (transparent).
  let renderItems: RenderItem[];
  if (isDragging && dropTarget) {
    const draggedInst = instances.find(i => i.id === dragState.widgetId);
    const origIdx = sorted.findIndex(i => i.id === dragState.widgetId);
    if (draggedInst && origIdx !== -1) {
      const colSpan = Math.min(draggedInst.colSpan ?? 1, NUM_COLUMNS - dropTarget.col);
      const others = sorted.filter(i => i.id !== dragState.widgetId);
      const items: RenderItem[] = others.map(inst => ({ kind: 'widget', inst }));
      items.splice(dropTarget.yIndex, 0, { kind: 'dropzone', col: dropTarget.col, colSpan });
      // Re-insert dragged widget at its original visual slot
      const insertAt = origIdx > dropTarget.yIndex ? origIdx + 1 : origIdx;
      items.splice(insertAt, 0, { kind: 'widget', inst: draggedInst });
      renderItems = items;
    } else {
      renderItems = sorted.map(inst => ({ kind: 'widget', inst }));
    }
  } else {
    renderItems = sorted.map(inst => ({ kind: 'widget', inst }));
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.topBar}>
        <span className={styles.logo}>Virlet</span>
        <button className={styles.addButton} onClick={openAdd} title="Add widget" aria-label="Add widget">+</button>
      </header>

      <main className={styles.grid} ref={gridRef}>
        {instances.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.emptyText}>No widgets yet.</p>
            <p className={styles.emptyHint}>Click <strong>+</strong> to add your first widget.</p>
          </div>
        ) : (
          renderItems.map((item) => {
            if (item.kind === 'dropzone') {
              return (
                <div
                  key="__dropzone__"
                  className={styles.dropZone}
                  style={{ gridColumn: `${item.col + 1} / span ${item.colSpan}` }}
                />
              );
            }

            const inst = item.inst;
            const entry = getEntry(inst.type);
            if (!entry) return null;
            const Content = entry.component;
            const colStart = Math.min(inst.x + 1, NUM_COLUMNS);
            const colSpan = Math.min(inst.colSpan ?? 1, NUM_COLUMNS - inst.x);
            const isBeingDragged = isDragging && dragState?.widgetId === inst.id;
            return (
              <div
                key={inst.id}
                ref={(el) => { if (el) cellRefs.current.set(inst.id, el); else cellRefs.current.delete(inst.id); }}
                style={{
                  gridColumn: `${colStart} / span ${colSpan}`,
                  opacity: isBeingDragged ? 0.25 : 1,
                  transition: isDragging ? 'none' : 'opacity 200ms',
                }}
              >
                <Widget
                  title={entry.label}
                  minimized={inst.minimized}
                  mandatory={entry.mandatory}
                  lastUpdated={inst.lastUpdated}
                  interval={inst.interval}
                  onRefresh={() => handleRefresh(inst.id)}
                  onToggleMinimize={() => handleToggleMinimize(inst.id)}
                  onOpenConfig={() => openConfig(inst.id)}
                  onClose={() => handleClose(inst.id)}
                  onDragStart={(e) => handleDragStart(inst.id, e)}
                >
                  <Content
                    config={inst.config}
                    instanceId={inst.id}
                    refreshKey={refreshKeys[inst.id] ?? 0}
                    onRefreshed={() => handleRefreshed(inst.id)}
                    sharedToken={sharedToken}
                  />
                </Widget>
              </div>
            );
          })
        )}
      </main>

      {isDragging && (() => {
        const inst = instances.find(i => i.id === dragState.widgetId);
        const entry = inst ? getEntry(inst.type) : null;
        const cellEl = cellRefs.current.get(dragState.widgetId);
        const cellRect = cellEl?.getBoundingClientRect();
        const ghostWidth = cellRect?.width ?? 200;

        let ghostLeft = dragState.pointerX - dragState.offsetX;
        if (dropTarget && gridRef.current) {
          const gridRect = gridRef.current.getBoundingClientRect();
          const colWidth = gridRect.width / NUM_COLUMNS;
          ghostLeft = gridRect.left + dropTarget.col * colWidth;
        }

        return (
          <div
            className={styles.dragGhost}
            style={{
              left: ghostLeft,
              top: dragState.pointerY - dragState.offsetY,
              width: ghostWidth,
            }}
          >
            <span className={styles.dragGhostLabel}>{entry?.label ?? inst?.type}</span>
          </div>
        );
      })()}

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
