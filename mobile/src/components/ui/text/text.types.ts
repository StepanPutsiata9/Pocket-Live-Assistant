import { TextProps as RNTextProps } from 'react-native';

export type ColorType =
  | 'main'
  | 'secondary'
  | 'placeholder'
  | 'inverse'
  | 'primary'
  | 'success'
  | 'error';
export type VariantType = 'body' | 'h1' | 'h2' | 'h3' | 'bodySmall' | 'caption';
export interface AppTextProps extends RNTextProps {
  variant?: VariantType;
  colorType?: ColorType;
}
