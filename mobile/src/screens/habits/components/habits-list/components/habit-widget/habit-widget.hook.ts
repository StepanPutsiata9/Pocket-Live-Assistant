import { HabitStructure } from '@screens/habits';
import { defineMarkDate, getTodayString } from '@screens/habits/habits.utils';
import { useHabitsStore } from '@store/habits';
import { addDays } from 'date-fns';
import { useEffect } from 'react';

export const useHabitWidget = (habit: HabitStructure) => {
  const updateHabit = useHabitsStore(state => state.updateHabit);

  const todayStr = getTodayString();

  const isMissing = habit.markDate < todayStr;
  const shouldShowMarkButton = habit.markDate <= todayStr;

  useEffect(() => {
    if (isMissing) {
      const newMarkDate = defineMarkDate(habit.days, new Date());

      updateHabit(habit.id, {
        ...habit,
        streak: 0,
        markDate: newMarkDate,
      });
    }
  }, [habit, isMissing, updateHabit]);

  const onMarkButtonPress = () => {
    const nextMarkDate = defineMarkDate(habit.days, addDays(new Date(), 1));

    updateHabit(habit.id, {
      ...habit,
      streak: habit.streak + 1,
      markDate: nextMarkDate,
    });
  };

  return {
    shouldShowMarkButton,
    onMarkButtonPress,
  };
};
