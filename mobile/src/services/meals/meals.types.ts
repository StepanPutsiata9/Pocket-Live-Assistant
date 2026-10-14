export interface SyncFoodPayload {
  date: string;
  type: string;
  name: string;
  calories: string;
  protein: string;
  fats: string;
  carbs: string;
}

export interface ClearFoodPayload {
  date: string;
}

export interface SyncWaterPayload {
  date: string;
  amount: number;
}
