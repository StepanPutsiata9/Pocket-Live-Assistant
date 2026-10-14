import { breakpoints } from './breakpoints';
import {
  borders,
  ChartColors,
  chartColorValues,
  elevation,
  gradients,
  opacity,
  radius,
  sizes,
  spacing,
  typography,
  zIndex,
} from './tokens';

export type AppSpacing = typeof spacing;
export type AppRadius = typeof radius;
export type AppTypography = typeof typography;
export type AppSizes = typeof sizes;
export type AppBreakpoints = typeof breakpoints;
export type AppChartColors = ChartColors;
export type AppChartColorValues = typeof chartColorValues;
export type AppBorders = typeof borders;
export type AppOpacity = typeof opacity;
export type AppZIndex = typeof zIndex;
export type AppElevation = typeof elevation;
export type ThemeColors = {
  brand: {
    primary: string;
    primaryLight: string;
    secondary: string;
    secondaryLight: string;
  };
  text: {
    main: string;
    secondary: string;
    placeholder: string;
    inverse: string;
    secondaryLight: string;
  };
  background: {
    main: string;
    surface: string;
    modal: string;
    progressBar: string;
  };
  ui: {
    border: string;
    divider: string;
    icon: string;
    disabled: string;
    shadow: string;
  };
  status: {
    success: string;
    error: string;
  };
  accents: {
    accent1: string;
    accent2: string;
    accent3: string;
    accent4: string;
    accent5: string;
  };
  gradients: typeof gradients;
  withOpacity: {
    income: string;
    expense: string;
    surface: string;
    error: string;
    primary: string;
    main: string;
    incomeCard: string;
    expenseCard: string;
    balance: string;
  };
  simple: {
    black: string;
    white: string;
    grey: string;
  };
  glow: string;
  border: {
    glass: string;
  };
};

export interface Theme {
  type: 'light' | 'dark';
  borders: AppBorders;
  colors: ThemeColors;
  spacing: AppSpacing;
  radius: AppRadius;
  typography: AppTypography;
  sizes: AppSizes;
  chartColors: AppChartColors;
  chartColorValues: AppChartColorValues;
  opacity: AppOpacity;
  zIndex: AppZIndex;
  elevation: AppElevation;
}
