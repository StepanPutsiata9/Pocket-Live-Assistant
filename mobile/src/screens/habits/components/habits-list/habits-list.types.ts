import { HabitStructure } from '@screens/habits';

export interface HabitsListProps {
  habits: HabitStructure[];
  onHabitPress: (habit: HabitStructure) => void;
}
