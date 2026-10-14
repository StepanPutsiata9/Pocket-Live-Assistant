import { colors, icons } from './habits.constants';

export type WeekDay = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

export interface HabitStructure {
  id: string;
  name: string;
  days: WeekDay[];
  color: HabitColor;
  icon: HabitIcon;
  streak: number;
  markDate: string;
}

export type HabitColor = (typeof colors)[number];
export type HabitIcon = (typeof icons)[number];

export type HabitPayload = Omit<HabitStructure, 'id'>;
