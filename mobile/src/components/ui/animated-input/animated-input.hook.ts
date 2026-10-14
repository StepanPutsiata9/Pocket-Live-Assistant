import { colors } from '@theme/tokens';
import { useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { type CSSAnimationKeyframes } from 'react-native-reanimated';

import {
  BlurHandler,
  FocusHandler,
  UseGlowInputParams,
} from './animated-input.types';

export const useGlowInput = ({
  value,
  defaultValue = '',
  onFocus,
  onBlur,
  onChangeText,
}: UseGlowInputParams = {}) => {
  const glowColor = colors.glow;

  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);

  const currentText = value !== undefined ? value : internalValue;
  const hasText = currentText.length > 0;

  const handleFocus: NonNullable<FocusHandler> = e => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur: NonNullable<BlurHandler> = e => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleChangeText = (text: string) => {
    if (value === undefined) {
      setInternalValue(text);
    }
    onChangeText?.(text);
  };
  const glowIn: CSSAnimationKeyframes = {
    from: { boxShadow: `0 0 0 0 ${glowColor}00` },
    to: { boxShadow: `0 0 8px 4px ${glowColor}80` },
  };

  const glowOut: CSSAnimationKeyframes = {
    from: { boxShadow: `0 0 8px 4px ${glowColor}59` },
    to: { boxShadow: `0 0 0 0 ${glowColor}00` },
  };

  const glowStyle: StyleProp<ViewStyle> = {
    animationName: isFocused ? glowIn : glowOut,
    animationDuration: isFocused ? '400ms' : '500ms',
    animationFillMode: 'forwards',
    animationTimingFunction: 'ease-out',
  } as unknown as StyleProp<ViewStyle>;

  return {
    isFocused,
    hasText,
    glowStyle,
    handleFocus,
    handleBlur,
    handleChangeText,
    glowColor: glowColor,
  };
};
