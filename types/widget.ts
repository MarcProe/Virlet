export interface WidgetInstance {
  id: string;
  type: string;
  minimized: boolean;
  x: number;
  y: number;
  config: Record<string, unknown>;
  lastUpdated?: number;
  interval?: string;
  colSpan?: number;
}

export type ConfigFieldType = 'text' | 'password' | 'select' | 'number';

export interface ConfigField {
  key: string;
  label: string;
  type: ConfigFieldType;
  options?: { label: string; value: string }[];
  placeholder?: string;
  default?: string;
}

export interface WidgetContentProps {
  config: Record<string, unknown>;
  instanceId: string;
  refreshKey: number;
  onRefreshed: () => void;
}
