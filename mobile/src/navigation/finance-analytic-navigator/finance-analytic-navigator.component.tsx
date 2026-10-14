import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';

import { TopTabBar } from '@/components/ui/top-tab-bar';
import { TopTabBarView } from '@/components/ui/top-tab-bar-view';
import { AnalyticHeader } from '@/screens/finance-analytic/components';

import { FINANCE_ANALYTIC_TABS } from './finance-analytic-navigator.constants';
import { FinanceAnalyticTabParamList } from './finance-analytic-navigator.types';

const TopTab = createMaterialTopTabNavigator<FinanceAnalyticTabParamList>();

const screenOptions = { lazy: true, lazyPreloadDistance: 0 } as const;

const renderTopTabBar = (props: MaterialTopTabBarProps) => (
  <TopTabBar {...props} />
);

export const FinanceAnalyticNavigator = () => {
  return (
    <TopTabBarView>
      <AnalyticHeader />
      <TopTab.Navigator tabBar={renderTopTabBar} screenOptions={screenOptions}>
        {FINANCE_ANALYTIC_TABS.map(item => (
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
