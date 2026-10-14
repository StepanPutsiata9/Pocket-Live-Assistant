import React from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';

import { Text } from '@/components/ui/text';
import { useActiveTranslation } from '@/hooks';
import { TransactionItem } from '@/screens/finance/components';
import { Transaction } from '@/screens/finance/finance.types';

import { styles } from './top-transactions.styles';
import { TopTransactionsProps } from './top-transactions.types';

const topTransactionKeyExtractor = (item: Transaction) => item.id;

const renderTopTransactionItem = ({
  item,
}: ListRenderItemInfo<Transaction>) => <TransactionItem item={item} />;

export const TopTransactions = ({ transactions }: TopTransactionsProps) => {
  const { t } = useActiveTranslation();
  return (
    <View style={styles.sectionCard}>
      <Text variant="h3" colorType="main">
        {t('Finance.analytics.topTransactions')}
      </Text>

      <FlatList
        scrollEnabled={false}
        keyExtractor={topTransactionKeyExtractor}
        data={transactions}
        contentContainerStyle={styles.listContent}
        renderItem={renderTopTransactionItem}
      />
    </View>
  );
};
