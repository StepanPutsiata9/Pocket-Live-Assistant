import { CALORIE_TARGET } from '@screens/food/components/meals-tab';
import { useDailyStats } from '@store/food';

export const useMealsDashboard = () => {
  const { data: dailyTotals = { calories: 0, protein: 0, fats: 0, carbs: 0 } } =
    useDailyStats();

  const localCalorieTarget = CALORIE_TARGET || 2000;
  const progressPercent = Math.min(
    (dailyTotals.calories / localCalorieTarget) * 100,
    100,
  );

  return {
    dailyTotals,
    progressPercent,
    localCalorieTarget,
  };
};
