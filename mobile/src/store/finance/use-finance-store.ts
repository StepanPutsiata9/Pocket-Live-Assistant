import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Category, TransactionType } from '@/screens/finance';
import { mmkvFinanceStorage } from '@/store/mmkv-storage';

import { DEFAULT_CATEGORIES } from './finance.constnats';
import {
  addCustomCategoryReducer,
  deleteCustomCategoryReducer,
} from './finance.utils';

export interface FinanceState {
  customCategories: Category[];
  addCustomCategory: (id: string, name: string, type: TransactionType) => void;
  deleteCustomCategory: (id: string) => void;
  clearCategories: () => void;
}

export const useFinanceStore = create<FinanceState>()(
  persist(
    set => ({
      customCategories: [],

      addCustomCategory: (id, name, type) =>
        set(state => ({
          customCategories: addCustomCategoryReducer(
            state.customCategories,
            id,
            name,
            type,
          ),
        })),

      deleteCustomCategory: id =>
        set(state => {
          const { customCategories } = deleteCustomCategoryReducer(
            state.customCategories,
            [],
            id,
          );
          return { customCategories };
        }),

      clearCategories: () => set({ customCategories: [] }),
    }),
    {
      name: 'finance-storage',
      storage: createJSONStorage(() => mmkvFinanceStorage),
    },
  ),
);

export const useFilteredCategories = (type: TransactionType) => {
  const customCats = useFinanceStore(state => state.customCategories);
  const allCategories = [...DEFAULT_CATEGORIES, ...customCats];
  return allCategories.filter(cat => cat.type === type);
};
