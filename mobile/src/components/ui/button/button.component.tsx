import React, { useMemo } from 'react';
import { ActivityIndicator, Pressable } from 'react-native';
import Animated from 'react-native-reanimated';

import { Text } from '@/components/ui/text';
import { usePressAnimation } from '@/hooks/use-press-animation';

import { styles } from './button.styles';
import { ButtonProps } from './button.types';
import { splitButtonStyle } from './button.utils';

export const Button = ({
  title,
  variant = 'primary',
  isLoading = false,
  disabled,
  style,
  containerStyle,
  textStyle,
  textVariant = 'body',
  ...rest
}: ButtonProps) => {
  const isDisabled = disabled || isLoading;
  styles.useVariants({
    variant,
    disabled: isDisabled,
  });

  const { animatedStyle, pressHandlers } = usePressAnimation();
  const { layoutStyle, pressableStyle } = useMemo(
    () => splitButtonStyle(style),
    [style],
  );

  return (
    <Animated.View style={[animatedStyle, layoutStyle]}>
      <Pressable
        {...pressHandlers}
        style={[styles.container, pressableStyle, containerStyle]}
        disabled={isDisabled}
        {...rest}
      >
        {isLoading ? (
          <ActivityIndicator color={styles.loader.color} />
        ) : (
          <Text variant={textVariant} style={[styles.text, textStyle]}>
            {title}
          </Text>
        )}
      </Pressable>
    </Animated.View>
  );
};
