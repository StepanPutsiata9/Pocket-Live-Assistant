import type { MMKV } from 'react-native-mmkv';
import { createMMKV } from 'react-native-mmkv';
import type { StateStorage } from 'zustand/middleware';

export const cleaningStorage = createMMKV({ id: 'cleaning-storage' });
export const habitsStorage = createMMKV({ id: 'habits-storage' });
export const financeStorage = createMMKV({ id: 'finance-storage' });
export const foodStorage = createMMKV({ id: 'food-storage' });
export const settingsStorage = createMMKV({ id: 'settings-storage' });
export const languageStorage = createMMKV({ id: 'language-storage' });
export const tasksStorage = createMMKV({ id: 'tasks-storage' });
export const savedRecipesStorage = createMMKV({ id: 'saved-recipes-storage' });
export const moodStorage = createMMKV({ id: 'mood-storage' });
export const createZustandAdapter = (storage: MMKV): StateStorage => ({
  setItem: (name, value) => {
    storage.set(name, value);
  },
  getItem: name => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: name => {
    storage.remove(name);
  },
});

export const mmkvStorage = createZustandAdapter(cleaningStorage);
export const mmkvFinanceStorage = createZustandAdapter(financeStorage);
export const mmkvFoodStorage = createZustandAdapter(foodStorage);
export const mmkvSettingsStorage = createZustandAdapter(settingsStorage);
export const mmkvLanguageStorage = createZustandAdapter(languageStorage);
export const mmkvTasksStorage = createZustandAdapter(tasksStorage);
export const mmkvSavedRecipesStorage =
  createZustandAdapter(savedRecipesStorage);
export const mmkvHabitsStorage = createZustandAdapter(habitsStorage);
export const mmkvMoodStorage = createZustandAdapter(moodStorage);
