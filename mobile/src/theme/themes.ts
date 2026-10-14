import {
  borders,
  chartColors,
  chartColorValues,
  colors,
  elevation,
  gradients,
  opacity,
  radius,
  sizes,
  spacing,
  typography,
  zIndex,
} from './tokens';
import { Theme, ThemeColors } from './types';

const lightColors: ThemeColors = {
  brand: {
    primary: colors.primary,
    primaryLight: colors.primaryLight,
    secondary: colors.secondary,
    secondaryLight: colors.secondaryLight,
  },
  text: {
    main: colors.grey800,
    secondary: colors.textSecondaryGrey,
    secondaryLight: colors.white,
    placeholder: colors.placeholderGrey,
    inverse: colors.white,
  },
  background: {
    main: colors.grey50,
    surface: colors.white,
    modal: colors.modal,
    progressBar: colors.grey200,
  },
  ui: {
    border: colors.grey200,
    divider: colors.grey100,
    icon: colors.iconGrey,
    disabled: colors.grey300,
    shadow: colors.shadowColor,
  },
  border: {
    glass: colors.surfaceOpacityLight,
  },
  status: {
    success: colors.success,
    error: colors.error,
  },
  accents: {
    accent1: colors.accent1,
    accent2: colors.accent2,
    accent3: colors.accent3,
    accent4: colors.accent4,
    accent5: colors.accent5,
  },
  gradients,
  withOpacity: {
    income: colors.incomeOpacity,
    expense: colors.expenseOpacity,
    surface: colors.surfaceOpacityLight,
    error: colors.errorOpacity,
    primary: colors.primaryOpacityLight,
    main: colors.mainOpacityLight,
    incomeCard: colors.incomeCardOpacity,
    expenseCard: colors.expenseCardOpacity,
    balance: colors.balanceOpacity,
  },
  simple: {
    black: colors.black,
    white: colors.white,
    grey: colors.grey800,
  },
  glow: colors.glow,
};

const darkColors: ThemeColors = {
  brand: {
    ...lightColors.brand,
    primaryLight: colors.click,
  },
  border: {
    glass: colors.surfaceOpacityLight,
  },
  text: {
    main: colors.white,
    secondary: colors.grey300,
    secondaryLight: colors.secondaryLight,
    placeholder: colors.iconGrey,
    inverse: colors.white,
  },
  background: {
    main: colors.black,
    surface: colors.grey900,
    modal: colors.modal,
    progressBar: colors.grey200,
  },
  ui: {
    border: colors.grey800,
    divider: colors.grey800,
    icon: colors.grey300,
    disabled: colors.grey300,
    shadow: colors.shadowColor,
  },
  status: {
    ...lightColors.status,
  },
  accents: {
    ...lightColors.accents,
  },
  gradients,
  withOpacity: {
    income: colors.incomeOpacity,
    expense: colors.expenseOpacity,
    error: colors.errorOpacity,
    surface: colors.surfaceOpacityDark,
    primary: colors.primaryOpacityDark,
    main: colors.mainOpacityDark,
    incomeCard: colors.incomeCardOpacity,
    expenseCard: colors.expenseCardOpacity,
    balance: colors.balanceOpacity,
  },
  simple: {
    black: colors.black,
    white: colors.white,
    grey: colors.grey300,
  },
  glow: colors.glow,
};

export const lightTheme: Theme = {
  type: 'light',
  borders,
  colors: lightColors,
  spacing,
  radius,
  typography,
  sizes,
  chartColors,
  chartColorValues,
  opacity,
  elevation,
  zIndex,
};

export const darkTheme: Theme = {
  type: 'dark',
  borders,
  colors: darkColors,
  spacing,
  radius,
  typography,
  sizes,
  chartColors,
  chartColorValues,
  opacity,
  elevation,
  zIndex,
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const;
