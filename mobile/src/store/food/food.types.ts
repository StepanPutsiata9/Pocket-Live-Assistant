export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface FoodItem {
  id: string;
  type: MealType;
  name: string;
  calories: number;
  protein?: string;
  fats?: string;
  carbs?: string;
  createdAt: string;
}

export type DailyMealCalories = Record<MealType, number>;

export interface MealCalendarPickerProps {
  isInverse?: boolean;
}

export interface UseMealsTabProps {
  onAddMeal?: (data: { mealType: MealType; foodName: string }) => void;
}

export interface BackendError {
  error: string;
}
export interface AddFoodPayload {
  type: MealType;
  name: string;
  protein?: string;
  fats?: string;
  carbs?: string;
  caloriesInput?: string;
}
