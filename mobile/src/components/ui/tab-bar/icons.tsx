import React from 'react';
import { ColorValue } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IconProps {
  color: ColorValue;
  isFocused: boolean;
  size: number;
}

export const icons = {
  Main: ({ color, isFocused, size }: IconProps) => (
    <Ionicons
      name={isFocused ? 'home' : 'home-outline'}
      size={size}
      color={color}
    />
  ),
  Schedule: ({ color, isFocused, size }: IconProps) => (
    <Ionicons
      name={isFocused ? 'calendar' : 'calendar-outline'}
      size={size}
      color={color}
    />
  ),
  Finance: ({ color, isFocused, size }: IconProps) => (
    <Ionicons
      name={isFocused ? 'wallet' : 'wallet-outline'}
      size={size}
      color={color}
    />
  ),
  Food: ({ color, isFocused, size }: IconProps) => (
    <Ionicons
      name={isFocused ? 'restaurant' : 'restaurant-outline'}
      size={size}
      color={color}
    />
  ),
};
