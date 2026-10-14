import {
  Category,
  toUSD,
  Transaction,
  TransactionType,
} from '@/screens/finance';

export const addTransactionReducer = (
  transactions: Transaction[],
  newTransaction: Transaction,
): Transaction[] => {
  return [newTransaction, ...transactions];
};

export const deleteTransactionReducer = (
  transactions: Transaction[],
  id: string,
): Transaction[] => transactions.filter(t => t.id !== id);

export const addCustomCategoryReducer = (
  customCategories: Category[],
  id: string,
  name: string,
  type: TransactionType,
): Category[] => {
  const newCategory: Category = {
    id,
    name,
    type,
    isCustom: true,
  };
  return [...customCategories, newCategory];
};

export const deleteCustomCategoryReducer = (
  customCategories: Category[],
  transactions: Transaction[],
  id: string,
) => {
  const fallbackCategory = 'other';

  const updatedCategories = customCategories.filter(cat => cat.id !== id);
  const updatedTransactions = transactions.map(tx =>
    tx.category === id ? { ...tx, category: fallbackCategory } : tx,
  );

  return {
    customCategories: updatedCategories,
    transactions: updatedTransactions,
  };
};

export const sanitizeTransactions = (
  rawTransactions: Transaction[],
  customCategories: Category[],
  defaultCategories: Category[],
): Transaction[] => {
  const existingCategoryIds = new Set([
    ...defaultCategories.map(c => c.id),
    ...customCategories.map(c => c.id),
  ]);

  return rawTransactions.map(tx => {
    if (!existingCategoryIds.has(tx.category)) {
      return { ...tx, category: 'other' };
    }
    return tx;
  });
};

export const calcBalance = (transactions: Transaction[] = []): number =>
  transactions.reduce(
    (acc, tx) =>
      tx.type === 'income'
        ? acc + toUSD(tx.amount, tx.currency)
        : acc - toUSD(tx.amount, tx.currency),
    0,
  );
