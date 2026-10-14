import { toUSD, Transaction } from '@/screens/finance';

export const groupByCategory = (
  transactions: Transaction[],
  type: 'income' | 'expense',
  getLabel: (id: string) => string,
) => {
  const map: Record<string, number> = {};
  transactions
    .filter(tx => tx.type === type)
    .forEach(tx => {
      map[tx.category] =
        (map[tx.category] ?? 0) + toUSD(tx.amount, tx.currency);
    });
  return Object.entries(map)
    .map(([id, amount]) => ({ id, label: getLabel(id), amount }))
    .sort((a, b) => b.amount - a.amount);
};
