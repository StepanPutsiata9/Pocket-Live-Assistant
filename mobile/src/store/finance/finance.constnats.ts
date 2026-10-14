import { Category } from '@/screens/finance';

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'food', name: 'food', type: 'expense' },
  { id: 'transport', name: 'transport', type: 'expense' },
  { id: 'shopping', name: 'shopping', type: 'expense' },
  { id: 'other', name: 'other', type: 'expense' },

  { id: 'salary', name: 'salary', type: 'income' },
  { id: 'freelance', name: 'freelance', type: 'income' },
  { id: 'investments', name: 'investments', type: 'income' },
  { id: 'other', name: 'other', type: 'income' },
];
export const FINANCE_KEYS = {
  transactions: ['transactions'] as const,
};
