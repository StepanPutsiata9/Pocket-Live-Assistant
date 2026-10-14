import { useState } from 'react';

import { useDailyFoodLog } from '@/store/food';

export const useMeals = () => {
  const [isManualRefreshing, setIsManualRefreshing] = useState(false);
  const { refetch } = useDailyFoodLog();
  const handleRefresh = async () => {
    setIsManualRefreshing(true);
    try {
      await refetch();
    } finally {
      setIsManualRefreshing(false);
    }
  };

  return {
    isRefreshing: isManualRefreshing,
    handleRefresh,
  };
};
