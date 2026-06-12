import type { ComponentType } from 'react';
import type { WidgetContentProps, ConfigField } from '../../types/widget';
import ProfileWidget from './ProfileWidget';
import EngagementWidget from './EngagementWidget';

export interface RegistryEntry {
  type: string;
  label: string;
  singleton: boolean;
  defaultColSpan?: number;
  configFields: ConfigField[];
  component: ComponentType<WidgetContentProps>;
}

export const REGISTRY: RegistryEntry[] = [
  {
    type: 'profile',
    label: 'Instagram Profile',
    singleton: true,
    defaultColSpan: 2,
    configFields: [
      {
        key: 'token',
        label: 'Access Token',
        type: 'password',
        placeholder: 'Paste Instagram access token',
      },
    ],
    component: ProfileWidget,
  },
  {
    type: 'engagement',
    label: 'Engagement Timeline',
    singleton: false,
    defaultColSpan: 4,
    configFields: [
      {
        key: 'token',
        label: 'Access Token',
        type: 'password',
        placeholder: 'Paste Instagram access token',
      },
      {
        key: 'postCount',
        label: 'Posts to analyse',
        type: 'number',
        placeholder: '50',
        default: '50',
      },
      {
        key: 'highlightCount',
        label: 'Highlight top N posts',
        type: 'number',
        placeholder: '3',
        default: '3',
      },
      {
        key: 'metric',
        label: 'Metric',
        type: 'select',
        default: 'engagement',
        options: [
          { label: 'Engagement rate (%)', value: 'engagement' },
          { label: 'Total interactions',  value: 'interactions' },
          { label: 'Likes only',          value: 'likes' },
          { label: 'Comments only',       value: 'comments' },
        ],
      },
      {
        key: 'showTrendLine',
        label: 'Trend line',
        type: 'select',
        default: 'true',
        options: [
          { label: 'Show', value: 'true' },
          { label: 'Hide', value: 'false' },
        ],
      },
    ],
    component: EngagementWidget,
  },
];

export function getEntry(type: string): RegistryEntry | undefined {
  return REGISTRY.find(e => e.type === type);
}
