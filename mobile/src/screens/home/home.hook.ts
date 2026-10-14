import { useNavigation } from '@react-navigation/native';
import { HomeMetricWidgetProps } from '@screens/home/components';
import { MOOD_KEYS } from '@screens/mood/mood.constants';
import { useHabitsStore } from '@store/habits';
import { useMoodStore } from '@store/mood';
import { useEffect, useMemo } from 'react';

import { useActiveTranslation } from '@/hooks';
import { useBalance } from '@/screens/finance/hooks';
import { useSyncTasks, useUncompletedTasksCount } from '@/store/cleaning';
import { useDailyStats, useSelectedDateWater } from '@/store/food';
import { useSettingsStore } from '@/store/settings';

import { HomeScreenNavigationProp } from './home.types';

export const useHome = () => {
  const { t } = useActiveTranslation();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const { data: uncompletedTasksCount = 0 } = useUncompletedTasksCount();
  const { mutate: syncTasks } = useSyncTasks();

  const avatarUri = useSettingsStore(s => s.avatarUri);

  useEffect(() => {
    syncTasks();
  }, [syncTasks]);

  const { formattedBalance } = useBalance();

  const { data: dailyStats } = useDailyStats();
  const { data: water = 0 } = useSelectedDateWater();

  const calories = dailyStats?.calories ?? 0;
  const habits = useHabitsStore(state => state.habits).length;
  const moodIndex = useMoodStore(s => s.moodIndex);
  const widgetsConfig = useMemo<(HomeMetricWidgetProps & { id: string })[]>(
    () => [
      {
        id: 'mood',
        themeName: 'mood',
        icon: 'happy-outline',
        value: `${moodIndex + 1} / ${MOOD_KEYS.length}`,
        label: t('Home.moodWidget', 'Mood'),
        onPress: () => navigation.navigate('Mood'),
      },
      {
        id: 'tasks',
        themeName: 'tasks',
        icon: 'list-outline',
        value: uncompletedTasksCount,
        label: t('Home.tasksWidget', 'Tasks'),
        onPress: () => navigation.navigate('Schedule', { screen: 'Cleaning' }),
      },
      {
        id: 'finance',
        themeName: 'finance',
        icon: 'wallet-outline',
        value: formattedBalance,
        unit: '$',
        label: t('Home.financeWidget', 'Expenses'),
        onPress: () => navigation.navigate('Finance'),
      },
      {
        id: 'calories',
        themeName: 'calories',
        icon: 'fast-food-outline',
        value: calories,
        unit: 'kcal',
        label: t('Home.caloriesWidget', 'Calories'),
        onPress: () => navigation.navigate('Food', { screen: 'Meals' }),
      },
      {
        id: 'habits',
        themeName: 'habits',
        icon: 'flame-outline',
        value: habits,
        label: t('Home.habitsWidget'),
        onPress: () => navigation.navigate('Schedule', { screen: 'Habits' }),
      },
      {
        id: 'water',
        themeName: 'water',
        icon: 'water-outline',
        value: water,
        unit: 'ml',
        label: t('Home.waterWidget'),
        onPress: () => navigation.navigate('Food', { screen: 'Water' }),
      },
    ],
    [
      uncompletedTasksCount,
      t,
      navigation,
      formattedBalance,
      calories,
      habits,
      water,
      moodIndex,
    ],
  );

  return {
    t,
    avatarUri,
    widgetsConfig,
  };
};
