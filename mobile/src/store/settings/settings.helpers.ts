import { Appearance } from 'react-native';

import { settingsStorage } from '../mmkv-storage';
import { ThemeMode } from './use-settings-store';

const getSettingsState = () => {
  try {
    const raw = settingsStorage.getString('settings-storage');
    if (raw) return JSON.parse(raw)?.state ?? null;
  } catch {}
  return null;
};

export const getSavedTheme = (): ThemeMode => {
  const theme = getSettingsState()?.theme;
  if (theme === 'light' || theme === 'dark') return theme;
  return Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
};
