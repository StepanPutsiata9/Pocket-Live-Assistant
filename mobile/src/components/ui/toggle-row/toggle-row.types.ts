import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface ToggleRowProps {
  label?: string;
  title: string;
  description?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  switchAnimationDuration?: number;
  /** Remounts the switch when locale or other external context changes. */
  switchKey?: string;
}
