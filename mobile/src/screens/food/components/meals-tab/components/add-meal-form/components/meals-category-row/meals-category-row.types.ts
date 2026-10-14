import { MealType } from '@store/food';

export interface MealsCategoryRowProps {
  mealType: MealType | '';
  setMealType: (mealType: MealType) => void;
}
