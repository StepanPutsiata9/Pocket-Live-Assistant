import { colors } from './colors';

export const gradients = {
  primary: [colors.primary, colors.secondPrimary],
  finance: [colors.gradientGreenStart, colors.gradientGreenEnd],
  water: [colors.gradientBlueStart, colors.gradientBlueEnd],
  tasks: [colors.gradientPurpleStart, colors.gradientPurpleEnd],
  calories: [colors.gradientOrangeStart, colors.gradientOrangeEnd],
  scrim: [colors.gradientScrimTransparent, colors.gradientScrimDark],
  meals: [colors.gradientRedStart, colors.gradientYellowEnd],
} as const;
