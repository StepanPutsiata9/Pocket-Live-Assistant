import React, { memo } from 'react';
import { View } from 'react-native';

import { styles } from './card.styles';
import { CardProps } from './card.types';

export const Card = memo(({ children, style }: CardProps) => {
  return <View style={[styles.container, style]}>{children}</View>;
});
