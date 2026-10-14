import { create } from 'zustand';

import { getFormatDateKey } from './food.utils';

interface FoodUIState {
  selectedDate: string;
  setSelectedDate: (dateKey: string) => void;
}

export const useFoodUIStore = create<FoodUIState>(set => ({
  selectedDate: getFormatDateKey(),
  setSelectedDate: selectedDate => set({ selectedDate }),
}));
