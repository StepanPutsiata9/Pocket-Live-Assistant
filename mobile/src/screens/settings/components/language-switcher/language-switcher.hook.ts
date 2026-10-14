import { useCallback } from 'react';

import { useActiveTranslation } from '@/hooks';
import { useLanguageStore } from '@/store/settings';

export const useLanguageSwitcher = () => {
  const { t } = useActiveTranslation();
  const language = useLanguageStore(state => state.language);
  const setLanguage = useLanguageStore(state => state.setLanguage);

  const handleLanguageChange = useCallback(
    (nextLanguage: 'en' | 'ru') => {
      if (nextLanguage !== language) {
        setLanguage(nextLanguage);
      }
    },
    [language, setLanguage],
  );

  return {
    t,
    currentLanguage: language,
    handleLanguageChange,
  };
};
