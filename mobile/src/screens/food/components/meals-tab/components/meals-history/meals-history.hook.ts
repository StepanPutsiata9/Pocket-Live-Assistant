import { BackendError } from '@screens/food/components/meals-tab';
import { useClearFoodHistory, useDailyFoodLog } from '@store/food';
import axios from 'axios';
import { useState } from 'react';

export const useMealsHistory = () => {
  const [error, setError] = useState<string | null>(null);

  const { data } = useDailyFoodLog();
  const { mutateAsync: storeClearHistory } = useClearFoodHistory();

  const history = data?.history ?? [];

  const clearHistory = async () => {
    try {
      setError(null);
      await storeClearHistory();
    } catch (err) {
      if (axios.isAxiosError<BackendError>(err)) {
        setError(err.response?.data?.error || 'Food.errors.foodClearError');
      } else {
        setError('Food.errors.foodClearError');
      }
    }
  };

  return {
    history,
    clearHistory,
    error,
  };
};
