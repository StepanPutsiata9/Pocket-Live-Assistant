import { useCallback, useMemo } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface PressAnimationOptions {
  activeScale?: number;
  springConfig?: Parameters<typeof withSpring>[1];
}

const DEFAULT_SPRING_CONFIG: Parameters<typeof withSpring>[1] = {
  damping: 15,
  stiffness: 150,
  mass: 0.5,
};

export const usePressAnimation = (options?: PressAnimationOptions) => {
  const { activeScale = 0.99, springConfig = DEFAULT_SPRING_CONFIG } =
    options || {};

  const scale = useSharedValue(1);

  const onPressIn = useCallback(() => {
    scale.value = withSpring(activeScale, springConfig);
  }, [activeScale, scale, springConfig]);

  const onPressOut = useCallback(() => {
    scale.value = withSpring(1, springConfig);
  }, [scale, springConfig]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const pressHandlers = useMemo(
    () => ({
      onPressIn,
      onPressOut,
    }),
    [onPressIn, onPressOut],
  );

  return {
    animatedStyle,
    pressHandlers,
  };
};
