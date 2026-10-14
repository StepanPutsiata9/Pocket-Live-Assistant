import { useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { animations } from '@/paths';

import { Props } from './boot-splash.types';

export const useBootSplash = ({ isReady, onAnimationEnd }: Props) => {
  const { height } = useWindowDimensions();

  const translateY = useSharedValue(0);
  const rotation = useSharedValue(0);
  const containerOpacity = useSharedValue(1);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));

  const { container, logo } = BootSplash.useHideAnimation({
    manifest: animations.manifest,
    logo: animations.logo,
    statusBarTranslucent: true,
    navigationBarTranslucent: true,
    animate: () => {
      BootSplash.hide();
    },
  });

  useEffect(() => {
    if (!isReady) return;

    rotation.value = withTiming(360, {
      duration: 700,
      easing: Easing.out(Easing.quad),
    });
    translateY.value = withSequence(
      withTiming(-100, {
        duration: 300,
        easing: Easing.out(Easing.quad),
      }),
      withTiming(
        height,
        {
          duration: 500,
          easing: Easing.in(Easing.quad),
        },
        finishedMove => {
          if (finishedMove) {
            containerOpacity.value = withTiming(
              0,
              { duration: 250 },
              opacityFinished => {
                if (opacityFinished && onAnimationEnd) {
                  runOnJS(onAnimationEnd)();
                }
              },
            );
          }
        },
      ),
    );
  }, [isReady, height, rotation, translateY, containerOpacity, onAnimationEnd]);

  return {
    logoAnimatedStyle,
    containerAnimatedStyle,
    container,
    logo,
  };
};
