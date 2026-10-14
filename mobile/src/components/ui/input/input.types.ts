import { ReactNode } from 'react';
import { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';

export interface InputProps extends TextInputProps {
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  error?: string | boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}
