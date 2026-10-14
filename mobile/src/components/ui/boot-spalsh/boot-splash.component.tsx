import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

import { useBootSplash } from './boot-splash.hook';
import { Props } from './boot-splash.types';

export const AnimatedBootSplash = ({ isReady, onAnimationEnd }: Props) => {
  const { logoAnimatedStyle, containerAnimatedStyle, container, logo } =
    useBootSplash({ isReady, onAnimationEnd });
  return (
    <Animated.View
      {...container}
      style={[container.style, StyleSheet.absoluteFill, containerAnimatedStyle]}
    >
      <Animated.View style={logoAnimatedStyle}>
        <Animated.Image {...logo} style={logo.style} />
      </Animated.View>
    </Animated.View>
  );
};
