import { StyleSheet, UnistylesRuntime } from 'react-native-unistyles';

import { getSavedTheme } from '@/store/settings';

import { breakpoints } from './breakpoints';
import { themes } from './themes';
import { AppBreakpoints } from './types';

const initialTheme = getSavedTheme();

type AppThemes = typeof themes;

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
  settings: {
    adaptiveThemes: false,
    initialTheme,
  },
  breakpoints,
  themes,
});

UnistylesRuntime.setRootViewBackgroundColor(
  UnistylesRuntime.getTheme(initialTheme).colors.background.main,
);
