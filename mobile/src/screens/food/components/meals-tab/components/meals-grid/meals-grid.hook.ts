import { useMealCalories } from '@store/food';

export const useMealsGrid = () => {
  const {
    data: mealCalories = { breakfast: 0, lunch: 0, dinner: 0, snack: 0 },
  } = useMealCalories();

  return {
    mealCalories,
  };
};
