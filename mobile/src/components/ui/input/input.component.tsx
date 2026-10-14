import React, { forwardRef, useState } from 'react';
import { TextInput, View } from 'react-native';

import { Text } from '@/components/ui/text';

import { styles } from './input.styles';
import { InputProps } from './input.types';

export const Input = forwardRef<TextInput, InputProps>(
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
      editable = true,
      ...rest
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: any) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: any) => {
      setIsFocused(false);
      onBlur?.(e);
    };

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

        <View style={styles.container}>
          {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}

          <TextInput
            ref={ref}
            style={[styles.input, inputStyle]}
            placeholderTextColor={styles.placeholderTextColor.color}
            onFocus={handleFocus}
            onBlur={handleBlur}
            editable={editable}
            numberOfLines={1}
            {...rest}
          />

          {rightIcon && (
            <View style={styles.rightIconContainer}>{rightIcon}</View>
          )}
        </View>

        {typeof error === 'string' && (
          <Text variant="caption" colorType="error" style={styles.errorText}>
            {error}
          </Text>
        )}
      </View>
    );
  },
);
