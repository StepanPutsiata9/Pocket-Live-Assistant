import { HabitPayload, HabitStructure } from '@screens/habits';
import { nanoid } from 'nanoid';

export const addHabitReducer = (
  habits: HabitStructure[],
  payload: HabitPayload,
): HabitStructure[] => {
  const newHabit: HabitStructure = {
    id: nanoid(),
    ...payload,
  };
  return [...habits, newHabit];
};

export const deleteHabitReducer = (habits: HabitStructure[], id: string) => {
  return habits.filter(habit => habit.id !== id);
};

export const updateHabitReducer = (
  habits: HabitStructure[],
  id: string,
  payload: HabitPayload,
): HabitStructure[] => {
  return habits.map(habit =>
    habit.id === id ? { ...habit, ...payload } : habit,
  );
};
