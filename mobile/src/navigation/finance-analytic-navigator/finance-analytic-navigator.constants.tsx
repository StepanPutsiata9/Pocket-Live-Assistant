import { FinanceAnalyticScreen } from '@/screens/finance-analytic';

import { FinanceAnalyticTabItem } from './finance-analytic-navigator.types';

const WeekFinanceAnalyticScreen = () => (
  <FinanceAnalyticScreen initialPeriod="week" />
);

const MonthFinanceAnalyticScreen = () => (
  <FinanceAnalyticScreen initialPeriod="month" />
);

const AllFinanceAnalyticScreen = () => (
  <FinanceAnalyticScreen initialPeriod="all" />
);

export const FINANCE_ANALYTIC_TABS: FinanceAnalyticTabItem[] = [
  {
    name: 'Week',
    component: WeekFinanceAnalyticScreen,
    options: { title: 'Finance.analytics.week' },
  },
  {
    name: 'Month',
    component: MonthFinanceAnalyticScreen,
    options: { title: 'Finance.analytics.month' },
  },
  {
    name: 'All',
    component: AllFinanceAnalyticScreen,
    options: { title: 'Finance.analytics.all' },
  },
];
