import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { gradients } from '@theme/tokens';
import React from 'react';
import { View } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import { LinearGradient } from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';

import { useTabBar } from './tab-bar.hook';
import { styles } from './tab-bar.styles';
import { TabBarButton } from './tab-bar-button';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const CustomTabBar = (props: BottomTabBarProps) => {
  const { state } = props;
  const {
    handleLayout,
    animatedStyle,
    backgroundSize,
    panGesture,
    tabPositionX,
    buttonWidth,
  } = useTabBar(props);

  return (
    <GestureDetector gesture={panGesture}>
      <View onLayout={handleLayout} style={styles.tabBar}>
        <AnimatedLinearGradient
          colors={[...gradients.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.animatedBackground, animatedStyle, backgroundSize]}
        />

        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          return (
            <TabBarButton
              key={route.name}
              navigation={props.navigation}
              routeKey={route.key}
              routeParams={route.params}
              isFocused={isFocused}
              tabIndex={index}
              tabPositionX={tabPositionX}
              buttonWidth={buttonWidth}
              routeName={route.name}
            />
          );
        })}
      </View>
    </GestureDetector>
  );
};
export const TabBar = React.memo(CustomTabBar);
