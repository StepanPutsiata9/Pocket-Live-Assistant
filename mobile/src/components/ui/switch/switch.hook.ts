// import { sizes, spacing } from '@theme/tokens';
// import { useCallback, useEffect, useRef, useState } from 'react';
// import { Animated, Easing } from 'react-native';

// import {
//   DEFAULT_SWITCH_ANIMATION_DURATION,
//   SwitchProps,
// } from './switch.types';

// const smoothEasing = Easing.bezier(0.4, 0, 0.2, 1);

// export const useSwitch = ({
//   value,
//   onValueChange,
//   animationDuration = DEFAULT_SWITCH_ANIMATION_DURATION,
// }: SwitchProps) => {
//   const translateXDistance =
//     sizes.switch.trackWidth - sizes.switch.thumbSize - spacing.s2 * 2;

//   const progress = useRef(new Animated.Value(value ? 1 : 0)).current;
//   const lastTargetRef = useRef(value ? 1 : 0);
//   const visualValueRef = useRef(value);
//   const [visualValue, setVisualValue] = useState(value);

//   const isAnimated = animationDuration > 0;

//   const animateTo = useCallback(
//     (target: 0 | 1) => {
//       lastTargetRef.current = target;

//       if (!isAnimated) {
//         progress.stopAnimation();
//         progress.setValue(target);
//         return;
//       }

//       progress.stopAnimation();
//       Animated.timing(progress, {
//         toValue: target,
//         duration: animationDuration,
//         easing: smoothEasing,
//         useNativeDriver: true,
//       }).start();
//     },
//     [animationDuration, isAnimated, progress],
//   );

//   useEffect(() => {
//     visualValueRef.current = value;
//     setVisualValue(value);

//     const target = value ? 1 : 0;
//     if (lastTargetRef.current === target) {
//       return;
//     }

//     animateTo(target);
//   }, [animateTo, value]);

//   const translateX = progress.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, translateXDistance],
//   });

//   const handlePress = () => {
//     const next = !visualValueRef.current;
//     visualValueRef.current = next;
//     setVisualValue(next);
//     animateTo(next ? 1 : 0);
//     onValueChange(next);
//   };

//   const instantThumbStyle = {
//     transform: [{ translateX: visualValue ? translateXDistance : 0 }],
//   };

//   const slidingThumbStyle = {
//     transform: [{ translateX }],
//   };

//   return {
//     handlePress,
//     hitSlop: spacing.s8,
//     instantThumbStyle,
//     isAnimated,
//     slidingThumbStyle,
//     visualValue,
//   };
// };
import { sizes, spacing } from '@theme/tokens';
import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

import { DEFAULT_SWITCH_ANIMATION_DURATION, SwitchProps } from './switch.types';

const smoothEasing = Easing.bezier(0.4, 0, 0.2, 1);

export const useSwitch = ({
  value,
  onValueChange,
  animationDuration = DEFAULT_SWITCH_ANIMATION_DURATION,
}: SwitchProps) => {
  const translateXDistance =
    sizes.switch.trackWidth - sizes.switch.thumbSize - spacing.s2 * 2;

  const isAnimated = animationDuration > 0;

  const progress = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    const target = value ? 1 : 0;

    if (!isAnimated) {
      progress.setValue(target);
      return;
    }
    Animated.timing(progress, {
      toValue: target,
      duration: animationDuration,
      easing: smoothEasing,
      useNativeDriver: true,
    }).start();
  }, [value, isAnimated, animationDuration, progress]);

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, translateXDistance],
  });

  const handlePress = () => {
    onValueChange(!value);
  };

  const slidingThumbStyle = {
    transform: [
      { translateX: isAnimated ? translateX : value ? translateXDistance : 0 },
    ],
  };

  return {
    handlePress,
    hitSlop: spacing.s8,
    slidingThumbStyle,
  };
};
