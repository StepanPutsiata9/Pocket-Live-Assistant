import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList } from 'react-native';

import { useActiveTranslation } from '@/hooks';
import { useDeleteTransaction, useTransactions } from '@/store/finance';

import { Transaction } from './finance.types';

export const useFinanceScreen = () => {
  const { t } = useActiveTranslation();
  const flatListRef = useRef<FlatList<Transaction>>(null);
  const [isManualRefreshing, setIsManualRefreshing] = useState(false);
  const {
    transactions: rawTransactions,
    isLoading,
    refetch,
  } = useTransactions();

  const { mutate: deleteTransaction } = useDeleteTransaction();

  useFocusEffect(
    useCallback(() => {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
    }, []),
  );
  const transactions = useMemo(
    () =>
      [...rawTransactions].sort((a, b) => {
        const diff = new Date(b.date).getTime() - new Date(a.date).getTime();
        if (diff !== 0) return diff;
        const aCreated = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bCreated = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bCreated - aCreated;
      }),
    [rawTransactions],
  );
  const handleRefresh = async () => {
    setIsManualRefreshing(true);
    try {
      await refetch();
    } finally {
      setIsManualRefreshing(false);
    }
  };
  return {
    t,
    isEmpty: transactions.length === 0,
    transactions,
    handleTransactionDelete: deleteTransaction,
    isInitialLoading: isLoading,
    isRefreshing: isManualRefreshing,
    handleRefresh,
    flatListRef,
  };
};
