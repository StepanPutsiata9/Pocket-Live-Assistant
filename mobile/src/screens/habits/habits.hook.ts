import { useHabitsStore } from '@store/habits/use-habits-store';
import { useCallback, useRef, useState } from 'react';

import { BottomSheetRef } from '@/components/ui/bottom-sheet';

import { HabitStructure } from './habits.types';

export const useHabits = () => {
  const bottomSheetRef = useRef<BottomSheetRef>(null);

  const habits = useHabitsStore(state => state.habits);

  const [editingHabit, setEditingHabit] = useState<HabitStructure | null>(null);

  const handleOpenBottomSheet = useCallback(() => {
    setEditingHabit(null);
    bottomSheetRef.current?.open();
  }, []);

  const handleWidgetPress = useCallback((habit: HabitStructure) => {
    setEditingHabit(habit);
    bottomSheetRef.current?.open();
  }, []);

  return {
    bottomSheetRef,
    habits,
    editingHabit,
    handleOpenBottomSheet,
    handleWidgetPress,
  };
};
