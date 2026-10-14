import { useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export const useSlidingTabs = <T extends string>(activeKey: T) => {
  const [layouts, setLayouts] = useState<
    Record<string, { x: number; width: number }>
  >({});

  const indicatorX = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);

  const handleLayout = (key: T) => (event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;

    setLayouts(prev => {
      const next = { ...prev, [key]: { x, width } };
      return next;
    });

    if (key === activeKey) {
      indicatorX.value = x;
      indicatorWidth.value = width;
    }
  };

  const currentLayout = layouts[activeKey];
  if (currentLayout) {
    indicatorX.value = withSpring(currentLayout.x, {
      damping: 18,
      stiffness: 180,
      mass: 0.6,
    });
    indicatorWidth.value = withSpring(currentLayout.width, {
      damping: 18,
      stiffness: 180,
      mass: 0.6,
    });
  }

  const indicatorStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: indicatorWidth.value,
    transform: [{ translateX: indicatorX.value }],
  }));

  return {
    handleLayout,
    indicatorStyle,
    isReady: Boolean(layouts[activeKey]),
  };
};
