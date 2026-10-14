import { View } from 'react-native';

import { Text } from '@/components/ui/text';
import { useFinanceScreen } from '@/screens/finance/finance.hook';

import { styles } from './list-empty.styles';

export const FinanceEmpty = () => {
  const { t } = useFinanceScreen();
  return (
    <View style={styles.emptyContainer}>
      <Text variant="bodySmall" colorType="secondary" style={styles.emptyText}>
        {t('Finance.emptyHistory')}
      </Text>
    </View>
  );
};
