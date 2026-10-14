import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/text';
import { LANGUAGES } from '@/screens/settings/settings.constants';

import { useLanguageSwitcher } from './language-switcher.hook';
import { styles } from './language-switcher.styles';

const LanguageItem = ({
  lang,
  isActive,
  onSelect,
}: {
  lang: (typeof LANGUAGES)[number];
  isActive: boolean;
  onSelect: (code: 'en' | 'ru') => void;
}) => {
  styles.useVariants({ isActive });

  return (
    <Pressable
      onPress={() => onSelect(lang.code)}
      style={({ pressed }) => (pressed ? styles.langButtonPressed : undefined)}
    >
      <View style={styles.langButton}>
        <Text variant="body" colorType={isActive ? 'primary' : 'secondary'}>
          {lang.label}
        </Text>
      </View>
    </Pressable>
  );
};

export const LanguageSwitcher = () => {
  const { t, currentLanguage, handleLanguageChange } = useLanguageSwitcher();

  return (
    <View style={styles.container}>
      <Text
        variant="bodySmall"
        colorType="secondary"
        style={styles.sectionLabel}
      >
        {t('Settings.language')}
      </Text>

      {LANGUAGES.map(lang => (
        <LanguageItem
          key={lang.code}
          lang={lang}
          isActive={currentLanguage === lang.code}
          onSelect={handleLanguageChange}
        />
      ))}
    </View>
  );
};
