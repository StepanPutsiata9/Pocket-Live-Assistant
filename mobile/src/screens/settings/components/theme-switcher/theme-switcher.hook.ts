import { useCallback } from 'react';
import { UnistylesRuntime, useUnistyles } from 'react-native-unistyles';

import { ThemeMode } from '@/store/settings';
import { applyAppTheme } from '@/theme/apply-app-theme';

export const useThemeToggle = () => {
  const { rt } = useUnistyles();
  const isDarkTheme = rt.themeName === 'dark';

  const toggleTheme = useCallback((enabled: boolean) => {
    const next: ThemeMode = enabled ? 'dark' : 'light';
    if (UnistylesRuntime.themeName !== next) {
      applyAppTheme(next);
    }
  }, []);

  return { isDarkTheme, toggleTheme };
};
