import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useCallback, useRef, useState } from 'react';
import { LayoutChangeEvent, Vibration } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import {
  cancelAnimation,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

export const useTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

  const totalRoutes = state.routes.length || 1;
  const buttonWidth = dimensions.width / totalRoutes;

  const PILL_MARGIN_X = 12;
  const pillWidth = Math.max(0, buttonWidth - PILL_MARGIN_X * 2);

  const tabPositionX = useSharedValue(0);
  const scaleX = useSharedValue(1);
  const startX = useSharedValue(0);
  const isDragging = useSharedValue(false);
  const dragIndex = useSharedValue(-1);
  const selectedIndex = useSharedValue(state.index);
  const buttonWidthSV = useSharedValue(buttonWidth);
  const totalRoutesSV = useSharedValue(totalRoutes);

  selectedIndex.value = state.index;
  buttonWidthSV.value = buttonWidth;
  totalRoutesSV.value = totalRoutes;

  const stateRef = useRef(state);
  const navigationRef = useRef(navigation);
  stateRef.current = state;
  navigationRef.current = navigation;

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  }, []);

  const navigateToIndex = useCallback((index: number) => {
    const { routes, index: activeIndex } = stateRef.current;
    const route = routes[index];
    if (route && activeIndex !== index) {
      const event = navigationRef.current.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!event.defaultPrevented) {
        navigationRef.current.navigate(route.name, route.params);
        Vibration.vibrate(1);
      }
    }
  }, []);

  useAnimatedReaction(
    () => selectedIndex.value * buttonWidthSV.value,
    (currentPosition, previousPosition) => {
      if (!isDragging.value) {
        if (previousPosition !== null && currentPosition !== previousPosition) {
          cancelAnimation(tabPositionX);
          cancelAnimation(scaleX);
          tabPositionX.value = withTiming(currentPosition, { duration: 270 });

          scaleX.value = withSequence(
            withTiming(1.35, { duration: 175 }),
            withTiming(1, { duration: 175 }),
          );
        } else {
          tabPositionX.value = currentPosition;
        }
      }
    },
  );

  const panGesture = Gesture.Pan()
    .activeOffsetX([-12, 12])
    .onStart(() => {
      isDragging.value = true;
      startX.value = tabPositionX.value;
      dragIndex.value = selectedIndex.value;
    })
    .onUpdate(event => {
      const width = buttonWidthSV.value;
      const routesCount = totalRoutesSV.value;
      const maxTranslate = width * (routesCount - 1);
      const nextPosition = startX.value + event.translationX;
      tabPositionX.value = Math.max(0, Math.min(nextPosition, maxTranslate));

      const currentIndex = Math.round(tabPositionX.value / width);
      dragIndex.value = Math.max(0, Math.min(currentIndex, routesCount - 1));

      scaleX.value = withTiming(1.15, { duration: 100 });
    })
    .onEnd(() => {
      isDragging.value = false;

      const width = buttonWidthSV.value;
      const routesCount = totalRoutesSV.value;
      const targetIndex = Math.round(tabPositionX.value / width);
      const clampedIndex = Math.max(0, Math.min(targetIndex, routesCount - 1));

      tabPositionX.value = withTiming(clampedIndex * width, {
        duration: 200,
      });
      scaleX.value = withTiming(1, { duration: 200 });
      dragIndex.value = -1;

      scheduleOnRN(navigateToIndex, clampedIndex);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: tabPositionX.value }, { scaleX: scaleX.value }],
  }));

  const backgroundSize = {
    width: pillWidth,
    height: Math.max(0, dimensions.height - 16),
    top: 8,
  };

  return {
    handleLayout,
    animatedStyle,
    backgroundSize,
    panGesture,
    tabPositionX,
    buttonWidth,
  };
};
