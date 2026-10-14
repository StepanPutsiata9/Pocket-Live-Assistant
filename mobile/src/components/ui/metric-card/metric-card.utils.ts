import { colors } from '@theme/tokens';

import { WidgetThemeName } from './metric-card.types';
// TO-DO: Refactor colors definition
const THEME_DICTIONARY: Record<WidgetThemeName, string[]> = {
  finance: [colors.gradientGreenStart, colors.gradientGreenEnd],
  water: [colors.gradientBlueStart, colors.gradientBlueEnd],
  tasks: [colors.gradientPurpleStart, colors.gradientPurpleEnd],
  calories: [colors.gradientOrangeStart, colors.gradientOrangeEnd],
  habits: [colors.gradientPinkStart, colors.gradientCyanEnd],
  mood: [colors.gradientPinkStart, colors.gradientOrangeEnd],
};

export const getGradientColors = (themeName: WidgetThemeName) => {
  return THEME_DICTIONARY[themeName];
};
