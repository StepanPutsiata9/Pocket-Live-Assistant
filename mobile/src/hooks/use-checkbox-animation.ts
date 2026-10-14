import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface CheckboxAnimationOptions {
  duration?: number;
}

export const useCheckboxAnimation = (
  isChecked: boolean,
  onToggle: () => void,
  options?: CheckboxAnimationOptions,
) => {
  const { duration = 220 } = options || {};

  const progress = useSharedValue(isChecked ? 1 : 0);

  const animateToggle = () => {
    progress.value = withTiming(isChecked ? 0 : 1, { duration }, finished => {
      if (finished) {
        runOnJS(onToggle)();
      }
    });
  };

  const fillStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scale: progress.value }],
  }));

  const checkStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scale: progress.value }],
  }));

  return { fillStyle, checkStyle, animateToggle };
};

export type CheckboxAnimatedStyle = ReturnType<
  typeof useCheckboxAnimation
>['fillStyle'];
