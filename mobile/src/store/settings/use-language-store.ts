import i18n from 'i18next';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { mmkvLanguageStorage } from '@/store/mmkv-storage';

export type Language = 'en' | 'ru';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    set => ({
      language: 'ru',
      setLanguage: language => {
        i18n.changeLanguage(language);
        set({ language });
      },
    }),
    {
      name: 'language-storage',
      storage: createJSONStorage(() => mmkvLanguageStorage),
    },
  ),
);
