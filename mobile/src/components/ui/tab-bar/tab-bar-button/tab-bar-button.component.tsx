import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { memo, useCallback } from 'react';
import { Pressable, Vibration } from 'react-native';
import Animated, { SharedValue } from 'react-native-reanimated';

import { sizes } from '@/theme/tokens/sizes';

import { icons } from '../icons.tsx';
import { useTabBarButton } from './tab-bar-button.hook';
import { styles } from './tab-bar-button.styles';

interface TabBarButtonProps {
  navigation: BottomTabBarProps['navigation'];
  routeKey: string;
  routeParams?: object;
  tabIndex: number;
  tabPositionX: SharedValue<number>;
  buttonWidth: number;
  routeName: string;
  isFocused: boolean;
}

const hitslop = { left: 15, right: 15, bottom: 15, top: 15 } as const;

export const TabBarButton = memo(
  ({
    navigation,
    routeKey,
    routeParams,
    tabIndex,
    tabPositionX,
    buttonWidth,
    routeName,
    isFocused,
  }: TabBarButtonProps) => {
    const handlePress = useCallback(() => {
      const event = navigation.emit({
        type: 'tabPress',
        target: routeKey,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(routeName, routeParams);
        Vibration.vibrate(1);
      }
    }, [isFocused, navigation, routeKey, routeName, routeParams]);

    const handleLongPress = useCallback(() => {
      navigation.emit({
        type: 'tabLongPress',
        target: routeKey,
      });
    }, [navigation, routeKey]);

    const { animatedIconStyle, isIconFilled, iconColor } = useTabBarButton(
      isFocused,
      tabIndex,
      tabPositionX,
      buttonWidth,
    );

    const IconComponent = icons[routeName as keyof typeof icons];

    return (
      <Pressable
        hitSlop={hitslop}
        onPress={handlePress}
        onLongPress={handleLongPress}
        style={styles.pressable}
      >
        <Animated.View style={animatedIconStyle}>
          {IconComponent ? (
            <IconComponent
              size={sizes.icon.lg}
              color={iconColor}
              isFocused={isIconFilled}
            />
          ) : null}
        </Animated.View>
      </Pressable>
    );
  },
);
