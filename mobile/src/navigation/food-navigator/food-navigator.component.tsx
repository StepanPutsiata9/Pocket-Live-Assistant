import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';

import { ScreenTitle } from '@/components/ui/screen-title';
import { TopTabBar } from '@/components/ui/top-tab-bar';
import { TopTabBarView } from '@/components/ui/top-tab-bar-view';
import { FoodTabParamList } from '@/navigation';

import { FOOD_TABS } from './food-navigator.constants';

const TopTab = createMaterialTopTabNavigator<FoodTabParamList>();

const screenOptions = { lazy: true, lazyPreloadDistance: 0 } as const;

const renderTopTabBar = (props: MaterialTopTabBarProps) => (
  <TopTabBar {...props} />
);

export const FoodNavigator = () => {
  return (
    <TopTabBarView>
      <ScreenTitle titleKey="Food.title" />
      <TopTab.Navigator tabBar={renderTopTabBar} screenOptions={screenOptions}>
        {FOOD_TABS.map(item => (
          <TopTab.Screen
            key={item.name}
            name={item.name}
            component={item.component}
            options={item.options}
          />
        ))}
      </TopTab.Navigator>
    </TopTabBarView>
  );
};
