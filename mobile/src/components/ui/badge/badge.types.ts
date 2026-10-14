import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type BadgeVariant = 'violet' | 'orange' | 'pink' | 'green' | 'neutral';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}
