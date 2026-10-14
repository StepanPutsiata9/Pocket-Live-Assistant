import { useState } from 'react';
import {
  interpolate,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useUnistyles } from 'react-native-unistyles';
import { scheduleOnRN } from 'react-native-worklets';

export const useTabBarButton = (
  isFocused: boolean,
  tabIndex: number,
  tabPositionX: SharedValue<number>,
  buttonWidth: number,
) => {
  const { theme } = useUnistyles();
  const [isUnderBackground, setIsUnderBackground] = useState(false);

  const targetX = tabIndex * buttonWidth;

  useAnimatedReaction(
    () => {
      const distance = Math.abs(tabPositionX.value - targetX);
      return distance < buttonWidth * 0.25;
    },
    (isUnder, previousIsUnder) => {
      if (isUnder !== previousIsUnder) {
        scheduleOnRN(setIsUnderBackground, isUnder);
      }
    },
    [targetX, buttonWidth],
  );

  let iconColor = theme.colors.simple.grey;

  if (isUnderBackground) {
    iconColor = theme.colors.simple.white;
  } else if (isFocused) {
    iconColor = theme.colors.text.main;
  }

  const isIconFilled = isUnderBackground || isFocused;

  const animatedIconStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      tabPositionX.value,
      [targetX - buttonWidth * 0.6, targetX, targetX + buttonWidth * 0.6],
      [1, 1.25, 1],
      'clamp',
    );

    const translateY = interpolate(
      tabPositionX.value,
      [targetX - buttonWidth * 0.6, targetX, targetX + buttonWidth * 0.6],
      [0, -2, 0],
      'clamp',
    );

    return {
      transform: [{ translateY }, { scale }],
    };
  });

  return {
    animatedIconStyle,
    iconColor,
    isIconFilled,
  };
};
