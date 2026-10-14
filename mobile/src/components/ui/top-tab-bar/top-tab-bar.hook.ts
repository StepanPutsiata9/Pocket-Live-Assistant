import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const useTopTabBar = (props: MaterialTopTabBarProps) => {
  const { state, navigation } = props;

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const tabCount = state.routes.length || 1;
  const buttonWidth =
    dimensions.width > 0 ? (dimensions.width - 8) / tabCount : 0;

  const tabPositionX = useSharedValue(0);

  const handleLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    });
  };

  useAnimatedReaction(
    () => buttonWidth * state.index,
    (currentPosition, previousPosition) => {
      if (previousPosition !== null && currentPosition !== previousPosition) {
        tabPositionX.value = withTiming(currentPosition, { duration: 250 });
      } else {
        tabPositionX.value = currentPosition;
      }
    },
    [state.index, buttonWidth],
  );

  const animatedStyle = useAnimatedStyle(() => ({
    width: buttonWidth,
    transform: [{ translateX: tabPositionX.value }],
  }));

  const getTabHandlers = (
    routeKey: string,
    routeName: string,
    isFocused: boolean,
  ) => {
    const handlePress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: routeKey,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(routeName);
      }
    };

    return { handlePress };
  };

  return {
    handleLayout,
    getTabHandlers,
    animatedStyle,
    buttonWidth,
  };
};
