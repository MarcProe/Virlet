import type { ComponentType } from 'react';
import type { WidgetContentProps, ConfigField } from '../../types/widget';
import ProfileWidget from './ProfileWidget';

export interface RegistryEntry {
  type: string;
  label: string;
  singleton: boolean;
  configFields: ConfigField[];
  component: ComponentType<WidgetContentProps>;
}

export const REGISTRY: RegistryEntry[] = [
  {
    type: 'profile',
    label: 'Instagram Profile',
    singleton: true,
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
];

export function getEntry(type: string): RegistryEntry | undefined {
  return REGISTRY.find(e => e.type === type);
}
