import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import i18n from '@/i18n';
import { ActionPayload, Transaction } from '@/screens/finance';
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
} from '@/services';
import {
  DEFAULT_CATEGORIES,
  FINANCE_KEYS,
} from '@/store/finance/finance.constnats';
import {
  calcBalance,
  sanitizeTransactions,
} from '@/store/finance/finance.utils';
import { useFinanceStore } from '@/store/finance/use-finance-store';

export const useTransactions = () => {
  const customCategories = useFinanceStore(state => state.customCategories);

  const query = useQuery({
    queryKey: FINANCE_KEYS.transactions,
    queryFn: getTransactions,
    staleTime: 1000 * 60,
    select: rawTransactions => {
      const sanitized = sanitizeTransactions(
        rawTransactions,
        customCategories,
        DEFAULT_CATEGORIES,
      );
      return {
        transactions: sanitized,
        balance: calcBalance(sanitized),
      };
    },
  });

  return {
    transactions: query.data?.transactions ?? [],
    balance: query.data?.balance ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    isRefetching: query.isRefetching,
  };
};

export const useAddTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ActionPayload) => createTransaction(payload),

    onMutate: async newPayload => {
      await queryClient.cancelQueries({ queryKey: FINANCE_KEYS.transactions });

      const previousTransactions =
        queryClient.getQueryData<Transaction[]>(FINANCE_KEYS.transactions) ??
        [];

      const tempTransaction: Transaction = {
        ...newPayload,
        id: `temp-${Date.now()}`,
        date: newPayload.date || new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData<Transaction[]>(
        FINANCE_KEYS.transactions,
        (old = []) => [tempTransaction, ...old],
      );

      return { previousTransactions };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousTransactions) {
        queryClient.setQueryData(
          FINANCE_KEYS.transactions,
          context.previousTransactions,
        );
      }
      Toast.show({
        type: 'error',
        text1: i18n.t('Finance.networkError'),
        text2: i18n.t('Finance.tryLater'),
        position: 'top',
        visibilityTime: 4000,
      });
    },

    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: i18n.t('Finance.transactionAddedTitle'),
        text2: i18n.t('Finance.transactionAddedBody'),
        position: 'top',
        visibilityTime: 3000,
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: FINANCE_KEYS.transactions });
    },
  });
};

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTransaction(id),

    onMutate: async deletedId => {
      await queryClient.cancelQueries({ queryKey: FINANCE_KEYS.transactions });

      const previousTransactions =
        queryClient.getQueryData<Transaction[]>(FINANCE_KEYS.transactions) ??
        [];

      queryClient.setQueryData<Transaction[]>(
        FINANCE_KEYS.transactions,
        (old = []) => old.filter(t => t.id !== deletedId),
      );

      return { previousTransactions };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousTransactions) {
        queryClient.setQueryData(
          FINANCE_KEYS.transactions,
          context.previousTransactions,
        );
      }
      Toast.show({
        type: 'error',
        text1: i18n.t('Finance.networkError'),
        text2: i18n.t('Finance.tryLater'),
        position: 'top',
      });
    },

    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: i18n.t('Finance.transactionDeleted'),
        position: 'top',
        visibilityTime: 2500,
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: FINANCE_KEYS.transactions });
    },
  });
};
