import { HabitIcon, icons } from '@screens/habits';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { HabitIconPickerProps, IconPickerWheelItem } from './icon-picker.types';

export const useIconPicker = (props: HabitIconPickerProps) => {
  const { value, onIconChange } = props;

  const [localValue, setLocalValue] = useState<HabitIcon>(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleValueChange = useCallback(
    ({ item }: IconPickerWheelItem) => {
      setLocalValue(item.value);
      onIconChange(item.value);
    },
    [onIconChange],
  );

  const pickerData = useMemo(() => {
    return icons.map(iconStr => ({
      value: iconStr,
      label: iconStr,
    }));
  }, []);

  return {
    localValue,
    handleValueChange,
    pickerData,
  };
};
