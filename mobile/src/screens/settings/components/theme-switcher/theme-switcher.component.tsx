import { Text } from '@/components/ui/text';
import { ToggleRow } from '@/components/ui/toggle-row';
import { useActiveTranslation } from '@/hooks';
import { useLanguageStore } from '@/store/settings';

import { useThemeToggle } from './theme-switcher.hook';
import { styles } from './theme-switcher.styles';

const THEME_SWITCH_ANIMATION_DURATION = 300;

export const ThemeSwitcher = () => {
  const { isDarkTheme, toggleTheme } = useThemeToggle();
  const { t } = useActiveTranslation();
  const language = useLanguageStore(state => state.language);

  return (
    <>
      <Text
        variant="bodySmall"
        colorType="secondary"
        style={styles.sectionLabel}
      >
        {t('Settings.appearance')}
      </Text>
      <ToggleRow
        title={isDarkTheme ? t('Settings.darkTheme') : t('Settings.lightTheme')}
        description={t('Settings.darkThemeDescription')}
        value={isDarkTheme}
        onValueChange={toggleTheme}
        switchAnimationDuration={THEME_SWITCH_ANIMATION_DURATION}
        switchKey={language}
      />
    </>
  );
};
