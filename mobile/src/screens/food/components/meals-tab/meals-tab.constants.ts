import { MealCategory } from '@screens/food/components/meals-tab/meals-tab.types.ts';

export const CALORIE_TARGET = 2000;
export const PROTEIN_TARGET = 130;
export const FATS_TARGET = 70;
export const CARBS_TARGET = 240;

export const MACROS_CONFIG = [
  {
    key: 'proteins',
    storeKey: 'protein',
    translationKey: 'Food.meals.proteins',
    target: PROTEIN_TARGET,
  },
  {
    key: 'fats',
    storeKey: 'fats',
    translationKey: 'Food.meals.fats',
    target: FATS_TARGET,
  },
  {
    key: 'carbs',
    storeKey: 'carbs',
    translationKey: 'Food.meals.carbs',
    target: CARBS_TARGET,
  },
];

export const MEAL_CATEGORIES: MealCategory[] = [
  {
    id: 'breakfast',
    icon: 'cafe-outline',
    translationKey: 'Food.meals.breakfast',
  },
  {
    id: 'lunch',
    icon: 'sunny-outline',
    translationKey: 'Food.meals.lunch',
  },
  {
    id: 'dinner',
    icon: 'moon-outline',
    translationKey: 'Food.meals.dinner',
  },
  {
    id: 'snack',
    icon: 'nutrition-outline',
    translationKey: 'Food.meals.snack',
  },
];

export const MACRO_FIELDS = [
  { key: 'proteins', translationKey: 'Food.meals.proteins' },
  { key: 'fats', translationKey: 'Food.meals.fats' },
  { key: 'carbs', translationKey: 'Food.meals.carbs' },
];
