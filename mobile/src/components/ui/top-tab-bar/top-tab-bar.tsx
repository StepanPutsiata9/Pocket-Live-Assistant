import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { Text } from '@/components/ui/text';
import { useActiveTranslation } from '@/hooks';

import { useTopTabBar } from './top-tab-bar.hook';
import { styles } from './top-tab-bar.styles';

export const TopTabBar = (props: MaterialTopTabBarProps) => {
  const { state, descriptors } = props;
  const { handleLayout, getTabHandlers, animatedStyle, buttonWidth } =
    useTopTabBar(props);
  const { t } = useActiveTranslation();

  return (
    <View onLayout={handleLayout} style={styles.tabBarContainer}>
      {buttonWidth > 0 && (
        <Animated.View style={[styles.activeTabSlider, animatedStyle]} />
      )}

      {state.routes.map((route, index) => {
        const options = descriptors[route.key]?.options;
        const labelKey = options?.title ?? route.name;
        const label = t(labelKey as string);

        const isFocused = state.index === index;
        const { handlePress } = getTabHandlers(
          route.key,
          route.name,
          isFocused,
        );

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tabButton}
            onPress={handlePress}
            activeOpacity={1}
          >
            <Text
              variant="bodySmall"
              colorType="main"
              style={isFocused && styles.activeTabButtonText}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
