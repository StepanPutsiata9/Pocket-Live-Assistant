import { HabitColor } from '@screens/habits';

export interface HabitColorPickerProps {
  onColorChange: (color: HabitColor) => void;
  value: HabitColor;
}

export type HabitColorPickerItemType = {
  item: {
    value: HabitColor;
    label: string;
  };
};
