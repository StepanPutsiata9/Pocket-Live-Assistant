export interface MealsMacrosFormProps {
  showMacros: boolean;
  caloriesInput: string;
  handleCaloriesChange: (value: string) => void;
  handleMacroChange: (key: string, value: string) => void;
  macros: Record<string, string>;
}
