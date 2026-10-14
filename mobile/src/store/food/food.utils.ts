import { FoodItem, MealType } from './food.types';

export const getFormatDateKey = (date: Date = new Date()): string => {
  return date.toISOString().split('T')[0]!;
};

export const setWaterAmountReducer = (
  waterByDate: Record<string, number> = {},
  dateKey: string,
  amount: number,
): Record<string, number> => {
  const currentAmount = waterByDate[dateKey] || 0;
  const newAmount = Math.max(0, currentAmount + amount);

  return {
    ...waterByDate,
    [dateKey]: newAmount,
  };
};

export const addFoodReducer = (
  historyByDate: Record<string, FoodItem[]> = {},
  dateKey: string,
  newItem: FoodItem,
): Record<string, FoodItem[]> => {
  const currentDayEntries = historyByDate[dateKey] || [];

  return {
    ...historyByDate,
    [dateKey]: [newItem, ...currentDayEntries],
  };
};

export const clearHistoryReducer = (
  historyByDate: Record<string, FoodItem[]> = {},
  dateKey: string,
): Record<string, FoodItem[]> => {
  return {
    ...historyByDate,
    [dateKey]: [],
  };
};

export const calcMealCalories = (
  entries: FoodItem[] = [],
): Record<MealType, number> => {
  const totals: Record<MealType, number> = {
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    snack: 0,
  };

  return entries.reduce((acc, item) => {
    if (acc[item.type] !== undefined) {
      acc[item.type] += item.calories;
    }
    return acc;
  }, totals);
};

export const calcDailyStats = (
  entries: FoodItem[] = [],
): {
  calories: number;
  protein: number;
  fats: number;
  carbs: number;
} => {
  let totalCalories = 0;
  let totalProtein = 0;
  let totalFats = 0;
  let totalCarbs = 0;

  entries.forEach(item => {
    totalCalories += item.calories;
    totalProtein += parseInt(item.protein || '0', 10) || 0;
    totalFats += parseInt(item.fats || '0', 10) || 0;
    totalCarbs += parseInt(item.carbs || '0', 10) || 0;
  });

  return {
    calories: totalCalories,
    protein: totalProtein,
    fats: totalFats,
    carbs: totalCarbs,
  };
};
