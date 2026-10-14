import { FadeInDown } from 'react-native-reanimated';

export const useFadeInStagger = (stepMs = 100, initialDelayMs = 0) => {
  const getAnimatedProps = (index: number) => {
    return FadeInDown.delay(initialDelayMs + index * stepMs)
      .duration(450)
      .springify();
  };

  return { getAnimatedProps };
};
