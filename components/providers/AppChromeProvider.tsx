'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';

export type AppChromeMode = 'default' | 'compact' | 'hidden';

interface AppChromeState {
  mode: AppChromeMode;
  label: string | null;
}

interface AppChromeContextType extends AppChromeState {
  headerHeight: number;
  setChromeState: (next: Partial<AppChromeState>) => void;
  resetChromeState: () => void;
}

const DEFAULT_STATE: AppChromeState = {
  mode: 'default',
  label: null,
};

const AppChromeContext = createContext<AppChromeContextType | undefined>(undefined);

export function AppChromeProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppChromeState>(DEFAULT_STATE);

  const value = useMemo<AppChromeContextType>(() => {
    const headerHeight = state.mode === 'compact' ? 72 : state.mode === 'hidden' ? 0 : 88;

    return {
      ...state,
      headerHeight,
      setChromeState: (next) => setState((current) => ({ ...current, ...next })),
      resetChromeState: () => setState(DEFAULT_STATE),
    };
  }, [state]);

  return <AppChromeContext.Provider value={value}>{children}</AppChromeContext.Provider>;
}

export function useAppChrome() {
  const context = useContext(AppChromeContext);
  if (!context) {
    throw new Error('useAppChrome must be used within an AppChromeProvider');
  }
  return context;
}
