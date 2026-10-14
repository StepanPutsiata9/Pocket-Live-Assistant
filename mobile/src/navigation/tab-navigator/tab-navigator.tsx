import NetInfo from '@react-native-community/netinfo';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { useEffect, useMemo } from 'react';
import { useUnistyles } from 'react-native-unistyles';

import { TabBar } from '@/components/ui/tab-bar';
import { useCleaningStore } from '@/store/cleaning/use-cleaning-store';

import { TAB_CONFIG } from './tab-navigator.constants';

const Tab = createBottomTabNavigator();

const renderTabBar = (props: BottomTabBarProps) => <TabBar {...props} />;

export const TabNavigator = () => {
  const { theme } = useUnistyles();

  const screenOptions = useMemo(
    () => ({
      headerShown: false as const,
      lazy: false,
      popToTopOnBlur: true,
      sceneStyle: { backgroundColor: theme.colors.background.main },
    }),
    [theme.colors.background.main],
  );

  useEffect(() => {
    let wasOffline = false;
    const unsubscribe = NetInfo.addEventListener(state => {
      const isOnline = Boolean(state.isConnected);
      if (isOnline && wasOffline) {
        useCleaningStore.getState().syncTasks();
      }
      wasOffline = !isOnline;
    });
    return unsubscribe;
  }, []);

  return (
    <Tab.Navigator tabBar={renderTabBar} screenOptions={screenOptions}>
      {TAB_CONFIG.map(item => (
        <Tab.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={item.options}
        />
      ))}
    </Tab.Navigator>
  );
};
