import { languageStorage } from '@/store/mmkv-storage';

import { Language } from './use-language-store';

const getLanguagesState = () => {
  try {
    const raw = languageStorage.getString('language-storage');
    if (raw) return JSON.parse(raw)?.state ?? null;
  } catch {}
  return null;
};

export const getSavedLanguage = (): Language => {
  const language = getLanguagesState()?.language;
  if (language === 'en' || language === 'ru') return language;
  return 'ru';
};
