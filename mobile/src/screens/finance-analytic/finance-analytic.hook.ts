import {
  addMonths,
  addWeeks,
  endOfMonth,
  endOfWeek,
  isAfter,
  isBefore,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { useCallback, useMemo, useState } from 'react';

import { useActiveTranslation } from '@/hooks';
import { toUSD, Transaction } from '@/screens/finance';
import { useFinanceStore, useTransactions } from '@/store/finance';

import { groupByCategory } from './finance-analytic.helpers';
import { type Period } from './finance-analytic.types';

export const useFinanceAnalytics = (initialPeriod: Period = 'month') => {
  const { t } = useActiveTranslation();
  const { customCategories } = useFinanceStore();
  const { transactions } = useTransactions();
  const [period, setPeriod] = useState<Period>(initialPeriod);
  const [offset, setOffset] = useState(0);

  const rangeStart = useMemo(() => {
    if (period === 'week')
      return startOfWeek(addWeeks(new Date(), offset), { weekStartsOn: 1 });
    if (period === 'month') return startOfMonth(addMonths(new Date(), offset));
    return null;
  }, [period, offset]);

  const rangeEnd = useMemo(() => {
    if (period === 'week')
      return endOfWeek(addWeeks(new Date(), offset), { weekStartsOn: 1 });
    if (period === 'month') return endOfMonth(addMonths(new Date(), offset));
    return null;
  }, [period, offset]);

  const filtered = useMemo(() => {
    let list: Transaction[];
    if (rangeStart && rangeEnd) {
      list = transactions.filter(tx => {
        const d = startOfDay(new Date(tx.date));
        return !isBefore(d, rangeStart) && !isAfter(d, rangeEnd);
      });
    } else {
      list = transactions;
    }
    return [...list].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [transactions, rangeStart, rangeEnd]);

  const totalIncome = useMemo(
    () =>
      filtered
        .filter(tx => tx.type === 'income')
        .reduce((acc, tx) => acc + toUSD(tx.amount, tx.currency), 0),
    [filtered],
  );

  const totalExpense = useMemo(
    () =>
      filtered
        .filter(tx => tx.type === 'expense')
        .reduce((acc, tx) => acc + toUSD(tx.amount, tx.currency), 0),
    [filtered],
  );

  const netBalance = totalIncome - totalExpense;

  const getCategoryLabel = useCallback(
    (id: string) => {
      const custom = customCategories.find(c => c.id === id);
      if (custom) return custom.name;
      return t(`Finance.categories.${id}`);
    },
    [customCategories, t],
  );

  const expenseByCategory = useMemo(
    () => groupByCategory(filtered, 'expense', getCategoryLabel),
    [filtered, getCategoryLabel],
  );

  const incomeByCategory = useMemo(
    () => groupByCategory(filtered, 'income', getCategoryLabel),
    [filtered, getCategoryLabel],
  );

  const topTransactions = useMemo(
    () => [...filtered].sort((a, b) => b.amount - a.amount).slice(0, 5),
    [filtered],
  );

  const handleSetPeriod = (p: Period) => {
    setPeriod(p);
    setOffset(0);
  };

  return {
    period,
    setPeriod: handleSetPeriod,
    offset,
    setOffset,
    rangeStart,
    rangeEnd,
    totalIncome,
    totalExpense,
    netBalance,
    expenseByCategory,
    incomeByCategory,
    topTransactions,
    hasData: filtered.length > 0,
  };
};
