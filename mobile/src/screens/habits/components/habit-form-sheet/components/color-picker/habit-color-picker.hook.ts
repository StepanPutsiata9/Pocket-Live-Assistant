import { colors, HabitColor } from '@screens/habits';
import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  HabitColorPickerItemType,
  HabitColorPickerProps,
} from './habit-color-picker.types';

export const useHabitColorPicker = (props: HabitColorPickerProps) => {
  const { onColorChange, value } = props;

  const [localValue, setLocalValue] = useState<HabitColor>(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const pickerData = useMemo(() => {
    return colors.map(colorStr => ({
      value: colorStr,
      label: colorStr,
    }));
  }, []);

  const handleValueChange = useCallback(
    ({ item }: HabitColorPickerItemType) => {
      setLocalValue(item.value);
      onColorChange(item.value);
    },
    [onColorChange],
  );

  return {
    handleValueChange,
    localValue,
    pickerData,
  };
};
