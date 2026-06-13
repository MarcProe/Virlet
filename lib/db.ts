import Dexie, { type Table } from 'dexie';
import type { WidgetInstance } from '../types/widget';

export interface ReelSnapshot {
  id?: number;
  widgetId: string;
  mediaId: string;
  timestamp: number;
  likeCount: number;
  commentsCount: number;
}

class VirletDB extends Dexie {
  widgets!: Table<WidgetInstance>;
  reelSnapshots!: Table<ReelSnapshot>;

  constructor() {
    super('virletdb');
    this.version(1).stores({
      widgets: 'id, type, x, y',
    });
    this.version(2).stores({
      widgets: 'id, type, x, y',
      reelSnapshots: '++id, widgetId, timestamp',
    });
  }
}

export const db = new VirletDB();
