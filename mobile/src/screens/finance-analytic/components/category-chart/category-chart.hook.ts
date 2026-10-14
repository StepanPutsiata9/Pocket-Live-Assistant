import { chartColorValues, getChartColor } from '@theme/tokens';
import { useMemo } from 'react';

import { CategoryEntry } from './category-chart.types';

export const useCategoryChart = (categories: CategoryEntry[]) => {
  const total = useMemo(
    () => categories.reduce((acc, cat) => acc + cat.amount, 0),
    [categories],
  );

  const pieData = useMemo(
    () =>
      categories.map((cat, i) => ({
        value: cat.amount,
        color: getChartColor(i, chartColorValues),
      })),
    [categories],
  );

  return {
    total,
    pieData,
  };
};
