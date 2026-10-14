import { ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';

import { Text } from '@/components/ui/text';
import { useActiveTranslation, useFadeInStagger } from '@/hooks';

import {
  AnalyticSummary,
  CategoryChart,
  TopTransactions,
  WeekNavigator,
} from './components';
import { useFinanceAnalytics } from './finance-analytic.hook';
import { styles } from './finance-analytic.styles';
import { FinanceAnalyticScreenProps } from './finance-analytic.types';

export const FinanceAnalyticScreen = ({
  initialPeriod = 'month',
}: FinanceAnalyticScreenProps) => {
  const { t } = useActiveTranslation();
  const {
    period,
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
    hasData,
  } = useFinanceAnalytics(initialPeriod);
  const { getAnimatedProps } = useFadeInStagger();

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {(period === 'week' || period === 'month') && rangeStart && rangeEnd && (
        <WeekNavigator
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          offset={offset}
          period={period}
          onPrev={() => setOffset(offset - 1)}
          onNext={() => setOffset(offset + 1)}
        />
      )}
      {!hasData ? (
        <Text variant="body" colorType="secondary" style={styles.emptyText}>
          {t('Finance.analytics.empty')}
        </Text>
      ) : (
        <>
          <Animated.View entering={getAnimatedProps(0)}>
            <AnalyticSummary
              totalIncome={totalIncome}
              totalExpense={totalExpense}
              netBalance={netBalance}
            />
          </Animated.View>
          {expenseByCategory.length > 0 && (
            <Animated.View entering={getAnimatedProps(1)}>
              <CategoryChart
                titleKey="Finance.analytics.expensesByCategory"
                categories={expenseByCategory}
              />
            </Animated.View>
          )}
          {incomeByCategory.length > 0 && (
            <Animated.View entering={getAnimatedProps(2)}>
              <CategoryChart
                titleKey="Finance.analytics.incomeByCategory"
                categories={incomeByCategory}
              />
            </Animated.View>
          )}
          {topTransactions.length > 0 && (
            <Animated.View entering={getAnimatedProps(3)}>
              <TopTransactions transactions={topTransactions} />
            </Animated.View>
          )}
        </>
      )}
    </ScrollView>
  );
};
