import { FoodNavigator } from '@navigation/food-navigator';
import { ScheduleNavigator } from '@navigation/schedule-navigator/schedule-navigator.component.tsx';

import { FinanceScreen } from '@/screens/finance';
import { HomeScreen } from '@/screens/home';

import { TabItem } from '../app-navigator.types';

const t = (key: string) => key;
export const TAB_CONFIG: TabItem[] = [
  {
    name: 'Main',
    component: HomeScreen,
    options: { title: t('navigation.tabs.main') },
  },
  {
    name: 'Schedule',
    component: ScheduleNavigator,
    options: { title: t('navigation.tabs.schedule') },
  },
  {
    name: 'Finance',
    component: FinanceScreen,
    options: { title: t('navigation.tabs.finance') },
  },
  {
    name: 'Food',
    component: FoodNavigator,
    options: { title: t('navigation.tabs.food') },
  },
];
