import React, { memo } from 'react';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { MetricCard } from '@/components/ui/metric-card';
import { Text } from '@/components/ui/text';
import { usePressAnimation } from '@/hooks';

import { styles } from './home-metric-widget.styles';
import { HomeMetricWidgetProps } from './home-metric-widget.types';

export const HomeMetricWidget = memo(
  ({
    themeName,
    icon,
    IconComponent = Ionicons,
    value,
    label,
    unit,
    onPress,
  }: HomeMetricWidgetProps) => {
    const a11yLabel = `${label}: ${value} ${unit || ''}`;
    const { animatedStyle, pressHandlers } = usePressAnimation();

    return (
      <Animated.View style={[styles.widgetWrapper, animatedStyle]}>
        <Pressable
          {...pressHandlers}
          onPress={onPress}
          disabled={!onPress}
          accessibilityRole={onPress ? 'button' : 'text'}
          accessibilityLabel={a11yLabel}
          style={({ pressed }) => [
            styles.widgetPressable,
            pressed && styles.widgetPressed,
          ]}
        >
          <MetricCard themeName={themeName}>
            <View style={styles.metricCardInner}>
              <IconComponent name={icon} style={styles.icon} />
              <View>
                <View style={styles.valueContainer}>
                  <Text variant="h3" colorType="inverse">
                    {value}
                  </Text>
                  {unit && (
                    <Text
                      variant="caption"
                      colorType="inverse"
                      style={styles.unit}
                    >
                      {unit}
                    </Text>
                  )}
                </View>
                <Text
                  variant="bodySmall"
                  colorType="inverse"
                  style={styles.metricLabel}
                >
                  {label}
                </Text>
              </View>
            </View>
          </MetricCard>
        </Pressable>
      </Animated.View>
    );
  },
);

export default HomeMetricWidget;
