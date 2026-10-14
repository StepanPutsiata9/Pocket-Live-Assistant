import { Appearance } from 'react-native';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { mmkvSettingsStorage } from '@/store/mmkv-storage';

export type ThemeMode = 'light' | 'dark';

export interface SettingsState {
  theme: ThemeMode;
  avatarUri: string | null;
  setTheme: (theme: ThemeMode) => void;
  setAvatarUri: (uri: string | null) => void;
}

const systemTheme: ThemeMode =
  Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';

export const useSettingsStore = create<SettingsState>()(
  persist(
    set => ({
      theme: systemTheme,
      avatarUri: null,
      setTheme: theme => set({ theme }),
      setAvatarUri: avatarUri => set({ avatarUri }),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => mmkvSettingsStorage),
      partialize: state => ({
        theme: state.theme,
        avatarUri: state.avatarUri,
      }),
    },
  ),
);
