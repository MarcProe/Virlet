import Dexie, { type Table } from 'dexie';
import type { WidgetInstance } from '../types/widget';

class VirletDB extends Dexie {
  widgets!: Table<WidgetInstance>;

  constructor() {
    super('virletdb');
    this.version(1).stores({
      widgets: 'id, type, x, y',
    });
  }
}

export const db = new VirletDB();
