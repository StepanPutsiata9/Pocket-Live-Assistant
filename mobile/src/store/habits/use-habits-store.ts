import { HabitPayload, HabitStructure } from '@screens/habits';
import {
  addHabitReducer,
  deleteHabitReducer,
  updateHabitReducer,
} from '@store/habits/habits.utils';
import { mmkvHabitsStorage } from '@store/mmkv-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface HabitsState {
  habits: HabitStructure[];
  addHabit: (payload: HabitPayload) => void;
  deleteHabit: (id: string) => void;
  updateHabit: (id: string, payload: HabitPayload) => void;
}

export const useHabitsStore = create<HabitsState>()(
  persist(
    set => ({
      habits: [],

      addHabit: payload =>
        set(state => ({
          habits: addHabitReducer(state.habits, payload),
        })),

      deleteHabit: id =>
        set(state => ({
          habits: deleteHabitReducer(state.habits, id),
        })),

      updateHabit: (id, payload) =>
        set(state => ({
          habits: updateHabitReducer(state.habits, id, payload),
        })),
    }),
    {
      name: 'habits-storage',
      storage: createJSONStorage(() => mmkvHabitsStorage),
    },
  ),
);
