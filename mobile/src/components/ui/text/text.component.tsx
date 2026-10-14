import React from 'react';
import { Text as RNText } from 'react-native';

import { styles } from './text.styles';
import { AppTextProps } from './text.types';

export const Text = ({
  variant = 'body',
  colorType = 'main',
  style,
  children,
  ...rest
}: AppTextProps) => {
  styles.useVariants({
    variant,
    colorType,
  });

  return (
    <RNText style={[styles.text, style]} {...rest}>
      {children}
    </RNText>
  );
};
