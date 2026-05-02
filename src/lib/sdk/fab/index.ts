import type { KylrixApp } from '../design';
import { FAB_LAYOUT } from '../design';

export interface FabAction {
  id: string;
  title: string;
  description: string;
  href?: string;
  icon?: string;
  app?: KylrixApp;
  disabled?: boolean;
}

export interface FabModel {
  size: typeof FAB_LAYOUT.size;
  bottomOffset: typeof FAB_LAYOUT.bottomOffset;
  actions: FabAction[];
}

export function createFabModel(actions: FabAction[]): FabModel {
  return {
    size: FAB_LAYOUT.size,
    bottomOffset: FAB_LAYOUT.bottomOffset,
    actions,
  };
}
