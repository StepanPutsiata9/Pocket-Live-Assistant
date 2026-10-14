import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';

import { ScreenTitle } from '@/components/ui/screen-title';
import { TopTabBar } from '@/components/ui/top-tab-bar';
import { TopTabBarView } from '@/components/ui/top-tab-bar-view';
import { ScheduleTabParamList } from '@/navigation';

import { SCHEDULE_TABS } from './schedule-navigator.constants';

const TopTab = createMaterialTopTabNavigator<ScheduleTabParamList>();

const screenOptions = { lazy: true, lazyPreloadDistance: 0 } as const;

const renderTopTabBar = (props: MaterialTopTabBarProps) => (
  <TopTabBar {...props} />
);

export const ScheduleNavigator = () => {
  return (
    <TopTabBarView>
      <ScreenTitle titleKey="Schedule.title" />
      <TopTab.Navigator tabBar={renderTopTabBar} screenOptions={screenOptions}>
        {SCHEDULE_TABS.map(item => (
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
