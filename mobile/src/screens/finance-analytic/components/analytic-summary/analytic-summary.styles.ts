import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  summaryRow: {
    flexDirection: 'row',
    gap: theme.spacing.s12,
    marginBottom: theme.spacing.s16,
  },
  summaryCard: {
    flex: 1,
    borderRadius: theme.radius.xl,
    paddingVertical: theme.spacing.s16,
    paddingHorizontal: theme.spacing.s16,
    gap: theme.spacing.s4,
  },
  summaryCardIncome: {
    backgroundColor: theme.colors.withOpacity.incomeCard,
  },
  summaryCardExpense: {
    backgroundColor: theme.colors.withOpacity.expenseCard,
  },
  summaryCardBalance: {
    backgroundColor: theme.colors.brand.primaryLight,
  },
  summaryIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s8,
    marginBottom: theme.spacing.s4,
  },
  summaryIconWrapper: {
    width: theme.sizes.icon.xl,
    height: theme.sizes.icon.xl,
    borderRadius: theme.radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryIconWrapperIncome: {
    backgroundColor: theme.colors.withOpacity.income,
  },
  summaryIconWrapperExpense: {
    backgroundColor: theme.colors.withOpacity.expense,
  },
  summaryIconWrapperBalance: {
    backgroundColor: theme.colors.withOpacity.balance,
  },
  summaryIcon: {
    ...theme.typography.body,
  },
  summaryIconIncome: {
    color: theme.chartColors.income,
  },
  summaryIconExpense: {
    color: theme.chartColors.expense,
  },
  summaryIconBalance: {
    color: theme.colors.brand.primary,
  },
  summaryAmountPositive: {
    color: theme.chartColors.income,
  },
  summaryAmountNegative: {
    color: theme.chartColors.expense,
  },
}));
