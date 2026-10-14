import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Text } from '@/components/ui/text';
import { useActiveTranslation } from '@/hooks';

import { styles } from './analytic-summary.styles';
import { AnalyticSummaryProps } from './analytic-summary.types';

export const AnalyticSummary = ({
  totalIncome,
  totalExpense,
  netBalance,
}: AnalyticSummaryProps) => {
  const { t } = useActiveTranslation();
  return (
    <>
      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, styles.summaryCardIncome]}>
          <View style={styles.summaryIconRow}>
            <View
              style={[
                styles.summaryIconWrapper,
                styles.summaryIconWrapperIncome,
              ]}
            >
              <Ionicons
                name="arrow-up-outline"
                style={[styles.summaryIcon, styles.summaryIconIncome]}
              />
            </View>
          </View>
          <Text variant="h3" colorType="main">
            {t('Finance.transaction.income')}
          </Text>
          <Text variant="h3" style={styles.summaryAmountPositive}>
            +{totalIncome.toFixed(2)} $
          </Text>
        </View>

        <View style={[styles.summaryCard, styles.summaryCardExpense]}>
          <View style={styles.summaryIconRow}>
            <View
              style={[
                styles.summaryIconWrapper,
                styles.summaryIconWrapperExpense,
              ]}
            >
              <Ionicons
                name="arrow-down-outline"
                style={[styles.summaryIcon, styles.summaryIconExpense]}
              />
            </View>
          </View>
          <Text variant="h3" colorType="main">
            {t('Finance.transaction.expense')}
          </Text>
          <Text variant="h3" style={styles.summaryAmountNegative}>
            -{totalExpense.toFixed(2)} $
          </Text>
        </View>
      </View>
      <View style={[styles.summaryCard, styles.summaryCardBalance]}>
        <View style={styles.summaryIconRow}>
          <View
            style={[
              styles.summaryIconWrapper,
              styles.summaryIconWrapperBalance,
            ]}
          >
            <Ionicons
              name="wallet-outline"
              style={[styles.summaryIcon, styles.summaryIconBalance]}
            />
          </View>
          <Text variant="h3" colorType="main">
            {t('Finance.bannerTitleText')}
          </Text>
        </View>
        <Text
          variant="h3"
          style={
            netBalance >= 0
              ? styles.summaryAmountPositive
              : styles.summaryAmountNegative
          }
        >
          {netBalance >= 0 ? '+' : ''}
          {netBalance.toFixed(2)} $
        </Text>
      </View>
    </>
  );
};
