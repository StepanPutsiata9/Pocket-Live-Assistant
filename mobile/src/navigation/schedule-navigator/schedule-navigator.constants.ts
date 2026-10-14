import { CleaningScreen } from '@screens/cleaning';
import { HabitsScreen } from '@screens/habits';

import { ScheduleTabItem } from '@/navigation';

const t = (key: string) => key;

export const SCHEDULE_TABS: ScheduleTabItem[] = [
  {
    name: 'Cleaning',
    component: CleaningScreen,
    options: { title: t('Schedule.tabs.cleaning') },
  },
  {
    name: 'Habits',
    component: HabitsScreen,
    options: { title: t('Schedule.tabs.habits') },
  },
];
