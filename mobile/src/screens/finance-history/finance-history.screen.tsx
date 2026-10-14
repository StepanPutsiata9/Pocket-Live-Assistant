import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { Screen } from '@/components/ui/screen';
import { TransactionItem } from '@/screens/finance/components/transaction-item';
import { useFinanceScreen } from '@/screens/finance/finance.hook';
import { Transaction } from '@/screens/finance/finance.types';
import { useDeleteTransaction } from '@/store/finance';

import { HistoryHeader } from './components';
import { styles } from './finance-history.styles';

const transactionKeyExtractor = (item: Transaction) => item.id;

const FinanceHistoryRowComponent = ({ item }: { item: Transaction }) => {
  const { mutate: deleteTransaction } = useDeleteTransaction();
  return <TransactionItem item={item} onDelete={id => deleteTransaction(id)} />;
};

const FinanceHistoryRow = React.memo(FinanceHistoryRowComponent);

const renderHistoryItem = ({ item }: ListRenderItemInfo<Transaction>) => (
  <FinanceHistoryRow item={item} />
);

export const FinanceHistoryScreen = () => {
  const { transactions } = useFinanceScreen();

  return (
    <Screen edges={['top']}>
      <HistoryHeader />
      <FlatList
        data={transactions}
        keyExtractor={transactionKeyExtractor}
        renderItem={renderHistoryItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
};
