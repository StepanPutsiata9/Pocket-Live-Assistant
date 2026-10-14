import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { getSavedLanguage } from '@/store/settings';

import { DEFAULT_LNG, SUPPORTED_LANGS } from './constants';
import en from './locales/en.json';
import ru from './locales/ru.json';

const resources = {
  en: { translation: en },
  ru: { translation: ru },
};

i18n.use(initReactI18next).init({
  debug: true,
  resources,
  lng: getSavedLanguage(),
  fallbackLng: DEFAULT_LNG,
  supportedLngs: SUPPORTED_LANGS,
  interpolation: {
    escapeValue: false,
  },
  react: { useSuspense: false },
});

export default i18n;
