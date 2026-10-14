import { HabitIcon } from '@screens/habits';

export interface HabitIconPickerProps {
  onIconChange: (icon: HabitIcon) => void;
  value: HabitIcon;
}

export type IconPickerWheelItem = {
  item: {
    value: HabitIcon;
    label: string;
  };
};
