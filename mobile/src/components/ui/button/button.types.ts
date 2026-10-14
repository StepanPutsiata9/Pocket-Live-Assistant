import { PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';

import { VariantType } from '@/components/ui/text';

type ButtonVariant = 'primary' | 'outline' | 'delete';

export interface ButtonProps extends Omit<
  PressableProps,
  'style' | 'children'
> {
  title: string;
  variant?: ButtonVariant;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  textVariant?: VariantType;
}
