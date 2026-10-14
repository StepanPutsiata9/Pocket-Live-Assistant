import React from 'react';
import { View } from 'react-native';

import { styles } from './screen.styles';
import { ScreenProps } from './screen.types';

export const Screen = ({
  children,
  style,
  edges = ['top', 'bottom'],
  ...rest
}: ScreenProps) => {
  return (
    <View
      style={[
        styles.container,
        edges.includes('top') && styles.paddingTop,
        edges.includes('bottom') && styles.paddingBottom,
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
};
