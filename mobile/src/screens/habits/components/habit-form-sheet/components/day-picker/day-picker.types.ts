import { WeekDay } from '@screens/habits';

export interface DayPickerProps {
  selectedDays: WeekDay[];
  handleToggleDay: (day: WeekDay) => void;
}
