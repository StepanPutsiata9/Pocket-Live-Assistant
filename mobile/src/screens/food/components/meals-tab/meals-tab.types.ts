export interface MealCalendarPickerProps {
  isInverse?: boolean;
}

export interface BackendError {
  error: string;
}

export type MealCategory = {
  id: string;
  icon: string;
  translationKey: string;
};
