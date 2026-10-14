import {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

export const useRightAction = (drag: SharedValue<number>) => {
  const iconAnimatedStyle = useAnimatedStyle(() => {
    const dragDistance = Math.abs(drag.value);

    const scale = interpolate(
      dragDistance,
      [40, 120, 220],
      [0.85, 1.1, 1.3],
      Extrapolation.CLAMP,
    );

    const rotate = interpolate(
      dragDistance,
      [80, 180],
      [0, -15],
      Extrapolation.CLAMP,
    );

    return {
      transform: [{ scale }, { rotate: `${rotate}deg` }],
    };
  });

  return { iconAnimatedStyle };
};
