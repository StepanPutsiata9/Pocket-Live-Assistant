import { StyleProp, ViewStyle } from 'react-native';

import type { CheckboxAnimatedStyle } from '@/hooks/use-checkbox-animation';

export interface CheckboxProps {
  isChecked: boolean;
  style?: StyleProp<ViewStyle>;
  fillStyle?: CheckboxAnimatedStyle;
  checkStyle?: CheckboxAnimatedStyle;
}
