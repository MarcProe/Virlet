import { useState, useEffect } from 'react';
import { REGISTRY, getEntry } from '../widgets/WidgetRegistry';
import type { WidgetInstance } from '../../types/widget';
import styles from './Sidebar.module.css';

const NUM_COLUMNS = 3;

type SidebarView =
  | { view: 'catalog' }
  | { view: 'config'; instanceId: string | null; type: string; draft: Record<string, unknown>; column: number };

interface Props {
  open: boolean;
  instances: WidgetInstance[];
  editingInstanceId: string | null;
  onClose: () => void;
  onSave: (instanceId: string | null, type: string, config: Record<string, unknown>, x: number) => void;
}

export default function Sidebar({ open, instances, editingInstanceId, onClose, onSave }: Props) {
  const [state, setState] = useState<SidebarView>({ view: 'catalog' });

  useEffect(() => {
    if (!open) return;
    if (editingInstanceId) {
      const inst = instances.find(i => i.id === editingInstanceId);
      if (inst) {
        setState({ view: 'config', instanceId: inst.id, type: inst.type, draft: { ...inst.config }, column: inst.x });
      }
    } else {
      setState({ view: 'catalog' });
    }
  }, [open, editingInstanceId]); // eslint-disable-line react-hooks/exhaustive-deps

  function leastPopulatedColumn(): number {
    const counts = Array(NUM_COLUMNS).fill(0) as number[];
    instances.forEach(i => { counts[Math.min(i.x, NUM_COLUMNS - 1)]++; });
    return counts.indexOf(Math.min(...counts));
  }

  function selectType(type: string) {
    setState({ view: 'config', instanceId: null, type, draft: {}, column: leastPopulatedColumn() });
  }

  function setDraft(key: string, value: unknown) {
    if (state.view !== 'config') return;
    setState({ ...state, draft: { ...state.draft, [key]: value } });
  }

  function setColumn(col: number) {
    if (state.view !== 'config') return;
    setState({ ...state, column: col });
  }

  function save() {
    if (state.view !== 'config') return;
    onSave(state.instanceId, state.type, state.draft, state.column);
    onClose();
  }

  const headerTitle = () => {
    if (state.view === 'catalog') return 'Add Widget';
    if (state.view === 'config' && state.instanceId) return 'Widget Settings';
    return 'Configure Widget';
  };

  return (
    <>
      {open && <div className={styles.overlay} onClick={onClose} />}
      <aside className={`${styles.panel} ${open ? styles.panelOpen : ''}`}>
        <div className={styles.header}>
          <span className={styles.headerTitle}>{headerTitle()}</span>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close sidebar">×</button>
        </div>

        <div className={styles.content}>
          {state.view === 'catalog' && (
            <div className={styles.catalog}>
              {REGISTRY.map(entry => {
                const alreadyExists = entry.singleton && instances.some(i => i.type === entry.type);
                return (
                  <button
                    key={entry.type}
                    className={`${styles.catalogItem} ${alreadyExists ? styles.catalogItemDisabled : ''}`}
                    onClick={() => !alreadyExists && selectType(entry.type)}
                    disabled={alreadyExists}
                  >
                    <span className={styles.catalogLabel}>{entry.label}</span>
                    <div className={styles.catalogMeta}>
                      {entry.singleton && <span className={styles.badge}>Singleton</span>}
                      {alreadyExists && <span className={styles.badge}>Added</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {state.view === 'config' && (() => {
            const entry = getEntry(state.type);
            if (!entry) return null;
            return (
              <div className={styles.configForm}>
                {state.instanceId === null && (
                  <button className={styles.backBtn} onClick={() => setState({ view: 'catalog' })}>
                    ← Back to catalog
                  </button>
                )}

                {entry.configFields.map(field => (
                  <div key={field.key} className={styles.field}>
                    <label className={styles.label}>{field.label}</label>
                    {field.type === 'select' ? (
                      <select
                        className={styles.select}
                        value={(state.draft[field.key] as string) ?? ''}
                        onChange={e => setDraft(field.key, e.target.value)}
                      >
                        <option value="">Select…</option>
                        {field.options?.map(o => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        className={styles.input}
                        type={field.type}
                        placeholder={field.placeholder ?? ''}
                        value={(state.draft[field.key] as string) ?? ''}
                        onChange={e => setDraft(field.key, e.target.value)}
                      />
                    )}
                  </div>
                ))}

                <div className={styles.field}>
                  <label className={styles.label}>Column</label>
                  <div className={styles.columnPicker}>
                    {Array.from({ length: NUM_COLUMNS }, (_, i) => (
                      <button
                        key={i}
                        className={`${styles.colBtn} ${state.column === i ? styles.colBtnActive : ''}`}
                        onClick={() => setColumn(i)}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>

                <button className={styles.saveBtn} onClick={save}>
                  {state.instanceId ? 'Save Changes' : 'Add Widget'}
                </button>
              </div>
            );
          })()}
        </div>
      </aside>
    </>
  );
}
