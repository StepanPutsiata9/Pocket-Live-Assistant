import { UnistylesRuntime } from 'react-native-unistyles';

import { ThemeMode, useSettingsStore } from '@/store/settings';

export const applyAppTheme = (theme: ThemeMode) => {
  UnistylesRuntime.setTheme(theme);
  UnistylesRuntime.setRootViewBackgroundColor(
    UnistylesRuntime.getTheme(theme).colors.background.main,
  );
  useSettingsStore.getState().setTheme(theme);
};
