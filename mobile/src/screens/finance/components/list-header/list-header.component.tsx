import React from 'react';
import { View } from 'react-native';

import { Text } from '@/components/ui/text';
import { useActiveTranslation } from '@/hooks';

import { AddTransactionCard, FinanceBanner } from './components';
import { styles } from './list-header.styles';

export const FinanceHeader = () => {
  const { t } = useActiveTranslation();

  return (
    <View style={styles.headerContainer}>
      <FinanceBanner />
      <AddTransactionCard />
      <Text colorType="main" variant="h3" style={styles.cardTitle}>
        {t('Finance.history')}
      </Text>
    </View>
  );
};
