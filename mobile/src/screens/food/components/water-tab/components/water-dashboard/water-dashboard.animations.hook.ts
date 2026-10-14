import { useEffect } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export const useWaterDashboardAnimations = (
  progressPercentage: number,
  waterAmount: number,
) => {
  const animatedProgress = useSharedValue(0);
  const dropScale = useSharedValue(1);
  const dropRotate = useSharedValue(0);

  useEffect(() => {
    const safePercent = Math.min(Math.max(progressPercentage, 0), 100);
    animatedProgress.value = withTiming(safePercent, { duration: 600 });
  }, [progressPercentage, animatedProgress]);

  useEffect(() => {
    if (waterAmount > 0) {
      dropScale.value = withSequence(
        withTiming(1.25, { duration: 90 }),
        withTiming(1, { duration: 170 }),
      );

      dropRotate.value = withSequence(
        withTiming(-12, { duration: 60 }),
        withTiming(12, { duration: 80 }),
        withTiming(0, { duration: 80 }),
      );
    }
  }, [waterAmount, dropScale, dropRotate]);

  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      width: `${animatedProgress.value}%`,
    };
  });

  const animatedDropStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: dropScale.value },
        { rotate: `${dropRotate.value}deg` },
      ],
    };
  });

  return {
    animatedProgressStyle,
    animatedDropStyle,
  };
};
