import { StyleProp, ViewStyle } from 'react-native';

export const DEFAULT_SWITCH_ANIMATION_DURATION = 250;

export interface SwitchProps {
  value: boolean;
  onValueChange: (newValue: boolean) => void;
  style?: StyleProp<ViewStyle>;
  /** Slide duration in ms. `0` disables animation. */
  animationDuration?: number;
}
