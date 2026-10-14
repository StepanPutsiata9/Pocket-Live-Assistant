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
export type FocusHandler = TextInputProps['onFocus'];
export type BlurHandler = TextInputProps['onBlur'];

export interface UseGlowInputParams {
  value?: string;
  defaultValue?: string;
  onFocus?: FocusHandler;
  onBlur?: BlurHandler;
  onChangeText?: (text: string) => void;
}
