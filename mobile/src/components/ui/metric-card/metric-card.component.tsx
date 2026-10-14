import React, { memo } from 'react';
import LinearGradient from 'react-native-linear-gradient';

import { styles } from './metric-card.styles';
import { MetricCardProps } from './metric-card.types';
import { getGradientColors } from './metric-card.utils';

export const MetricCard = memo(
  ({
    children,
    themeName,
    size = 'small',
    style,
    ...rest
  }: MetricCardProps) => {
    styles.useVariants({
      size: size,
    });

    return (
      <LinearGradient
        colors={getGradientColors(themeName)}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.container, style]}
        {...rest}
      >
        {children}
      </LinearGradient>
    );
  },
);
