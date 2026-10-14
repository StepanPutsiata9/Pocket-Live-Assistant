import { useEffect } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const useProgressBarAnimation = (progressPercent: number) => {
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    const safePercent = Math.min(Math.max(progressPercent, 0), 100);
    animatedProgress.value = withTiming(safePercent, { duration: 600 });
  }, [animatedProgress, progressPercent]);

  const animatedProgressStyle = useAnimatedStyle(() => ({
    width: `${animatedProgress.value}%`,
  }));

  return { animatedProgressStyle };
};
