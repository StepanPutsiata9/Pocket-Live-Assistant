import {
  colors,
  defineMarkDate,
  HabitColor,
  HabitIcon,
  icons,
  SNAP_POINTS,
  WeekDay,
} from '@screens/habits';
import { useHabitsStore } from '@store/habits';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { HabitFormSheetProps } from './habit-form-sheet.types';

export const useHabitFormSheet = (props: HabitFormSheetProps) => {
  const { editingHabit, sheetRef } = props;

  const addHabit = useHabitsStore(state => state.addHabit);
  const updateHabit = useHabitsStore(state => state.updateHabit);
  const deleteHabit = useHabitsStore(state => state.deleteHabit);

  const [habitName, setHabitName] = useState<string>('');
  const [selectedDays, setSelectedDays] = useState<WeekDay[]>([]);
  const selectedColor = useRef<HabitColor>(colors[0]);
  const icon = useRef<HabitIcon>(icons[0]);
  const [streak, setStreak] = useState<number>(0);

  const isEditingHabit = !!editingHabit;

  useEffect(() => {
    if (editingHabit) {
      setHabitName(editingHabit.name);
      setSelectedDays(editingHabit.days);
      selectedColor.current = editingHabit.color;
      icon.current = editingHabit.icon;
      setStreak(editingHabit.streak);
    } else {
      setHabitName('');
      setSelectedDays([]);
      selectedColor.current = colors[0];
      icon.current = icons[0];
      setStreak(0);
    }
  }, [editingHabit]);

  const snapPoints = useMemo(
    () => (isEditingHabit ? SNAP_POINTS.EDITING : SNAP_POINTS.DEFAULT),
    [isEditingHabit],
  );

  const isSubmitDisabled = useMemo(() => {
    return !habitName.trim() || selectedDays.length === 0;
  }, [habitName, selectedDays]);

  const onInputChange = useCallback((value: string) => {
    setHabitName(value);
  }, []);

  const handleToggleDay = useCallback((dayName: WeekDay) => {
    setSelectedDays(prev =>
      prev.includes(dayName)
        ? prev.filter(day => day !== dayName)
        : [...prev, dayName],
    );
  }, []);

  const onColorChange = useCallback((value: HabitColor) => {
    selectedColor.current = value;
  }, []);

  const onIconChange = useCallback((value: HabitIcon) => {
    icon.current = value;
  }, []);

  const closeSheet = useCallback(() => {
    sheetRef.current?.close();
  }, [sheetRef]);

  const onSubmit = useCallback(() => {
    if (isSubmitDisabled) return;

    if (isEditingHabit && editingHabit) {
      const prevDaysSorted = editingHabit.days.slice().sort().join(',');
      const selectedDaysSorted = selectedDays.slice().sort().join(',');
      const isDaysChanged = prevDaysSorted !== selectedDaysSorted;

      updateHabit(editingHabit.id, {
        name: habitName.trim(),
        color: selectedColor.current,
        days: selectedDays,
        streak: streak,
        icon: icon.current,
        markDate: isDaysChanged
          ? defineMarkDate(selectedDays)
          : editingHabit.markDate,
      });
    } else {
      addHabit({
        name: habitName.trim(),
        color: selectedColor.current,
        days: selectedDays,
        icon: icon.current,
        streak: 0,
        markDate: defineMarkDate(selectedDays),
      });
    }

    closeSheet();
  }, [
    isSubmitDisabled,
    isEditingHabit,
    editingHabit,
    habitName,
    selectedDays,
    streak,
    updateHabit,
    addHabit,
    closeSheet,
  ]);

  const onDelete = useCallback(() => {
    if (isEditingHabit && editingHabit) {
      deleteHabit(editingHabit.id);
      closeSheet();
    }
  }, [isEditingHabit, editingHabit, deleteHabit, closeSheet]);

  const onChangeBottomSheet = useCallback(
    (index: number) => {
      if (index === -1 && !isEditingHabit) {
        setHabitName('');
        setSelectedDays([]);
      }
    },
    [isEditingHabit],
  );

  return {
    snapPoints,
    habitName,
    selectedDays,
    selectedColor,
    icon,
    isEditingHabit,
    isSubmitDisabled,
    onInputChange,
    handleToggleDay,
    onColorChange,
    onIconChange,
    onChangeBottomSheet,
    onSubmit,
    onDelete,
  };
};
