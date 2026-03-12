import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';

export enum ThemeMode {
  Light = 'light',
  Dark = 'dark',
}

type ThemeContextValue = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>(
    systemScheme === 'dark' ? ThemeMode.Dark : ThemeMode.Light
  );

  const toggleMode = useCallback(() => {
    setMode((current) =>
      current === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark
    );
  }, []);

  const value = useMemo(
    () => ({ mode, setMode, toggleMode }),
    [mode, toggleMode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeController() {
  const value = useContext(ThemeContext);
  if (!value) {
    throw new Error('useThemeController must be used within ThemeProvider');
  }
  return value;
}
