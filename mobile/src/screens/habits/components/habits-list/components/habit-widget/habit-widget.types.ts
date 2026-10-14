import { HabitStructure } from '@screens/habits';

export interface HabitWidgetProps {
  habit: HabitStructure;
  index: number;
  onPress: (habit: HabitStructure) => void;
}

export type DayNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;
