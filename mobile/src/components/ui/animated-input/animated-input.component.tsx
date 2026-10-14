import React, { forwardRef } from 'react';
import { TextInput, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { Text } from '@/components/ui/text';

import { useGlowInput } from './animated-input.hook';
import { styles } from './animated-input.styles';
import { InputProps } from './animated-input.types';

export const AnimatedInput = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      leftIcon,
      rightIcon,
      error,
      style,
      inputStyle,
      onFocus,
      onBlur,
      onChangeText,
      value,
      defaultValue,
      editable = true,
      ...rest
    },
    ref,
  ) => {
    const {
      isFocused,
      glowStyle,
      handleFocus,
      handleBlur,
      handleChangeText,
      glowColor,
    } = useGlowInput({
      value,
      defaultValue,
      onFocus,
      onBlur,
      onChangeText,
    });

    styles.useVariants({
      isFocused,
      hasError: !!error,
      isDisabled: !editable,
    });

    return (
      <View style={[styles.root, style]}>
        {label && (
          <Text variant="caption" colorType="secondary">
            {label}
          </Text>
        )}

        <Animated.View style={[styles.container, glowStyle]}>
          {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}

          <TextInput
            ref={ref}
            value={value}
            defaultValue={defaultValue}
            style={[styles.input, inputStyle]}
            placeholderTextColor={styles.placeholderTextColor.color}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={handleChangeText}
            editable={editable}
            cursorColor={glowColor}
            {...rest}
          />

          {rightIcon && (
            <View style={styles.rightIconContainer}>{rightIcon}</View>
          )}
        </Animated.View>

        {typeof error === 'string' && (
          <Text variant="caption" colorType="error" style={styles.errorText}>
            {error}
          </Text>
        )}
      </View>
    );
  },
);
