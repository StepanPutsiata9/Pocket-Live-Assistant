import {
  DarkTheme,
  DefaultTheme,
  Theme as NavigationTheme,
} from '@react-navigation/native';

import { Theme } from '@/theme/types';

export const buildNavigationTheme = (
  appTheme: Theme,
  themeName: string,
): NavigationTheme => {
  const base = themeName === 'dark' ? DarkTheme : DefaultTheme;

  return {
    ...base,
    colors: {
      ...base.colors,
      primary: appTheme.colors.brand.primary,
      background: appTheme.colors.background.main,
      card: appTheme.colors.background.main,
      text: appTheme.colors.text.main,
      border: appTheme.colors.ui.border,
      notification: appTheme.colors.brand.primary,
    },
  };
};
