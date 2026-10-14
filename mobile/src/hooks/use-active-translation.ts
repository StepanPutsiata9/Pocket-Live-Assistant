import { useIsFocused } from '@react-navigation/native';
import i18n from 'i18next';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export function useActiveTranslation(ns?: string) {
  const { t } = useTranslation(ns, { bindI18n: false });
  const isFocused = useIsFocused();
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const handleLanguageChange = () => {
      if (isFocused) {
        forceUpdate({});
      }
    };
    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [isFocused]);
  return { t, i18n };
}
