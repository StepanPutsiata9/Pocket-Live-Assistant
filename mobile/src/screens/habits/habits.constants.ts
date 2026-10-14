import { WeekDay } from './habits.types';

export const HABIT_WEEK_DAYS: WeekDay[] = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun',
];

export const colors = [
  '#FF6B6B',
  '#FF8A5B',
  '#FFB7B2',
  '#D4A5A5',

  '#FFD93D',
  '#F4C724',
  '#FFB067',

  '#A8E6CF',
  '#4ECDC4',
  '#73C6B6',
  '#C1E1C1',

  '#74B9FF',
  '#82C0E7',
  '#9BA4B5',
  '#5D6D7E',

  '#CBAACB',
  '#9D4EDD',
  '#6A0572',
] as const;

export const icons = [
  'barbell-outline',
  'library-outline',
  'heart-outline',
  'bicycle-outline',
  'camera-outline',
  'brush-outline',
  'build-outline',
  'calendar-number-outline',
  'flash-outline',
  'fast-food-outline',
  'trophy-outline',
  'game-controller-outline',
  'cafe-outline',
  'beer-outline',
  'moon-outline',
  'paw-outline',
  'footsteps-outline',
  'cash-outline',
  'people-outline',
  'flower-outline',
] as const;

export const SNAP_POINTS = {
  DEFAULT: ['60%'],
  EDITING: ['65%'],
};
