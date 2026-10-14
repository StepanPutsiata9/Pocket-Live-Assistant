import apiClient from '@/api/api-client';
import { FoodItem } from '@/store/food/food.types';

export interface DailyLogResponse {
  history: FoodItem[];
  water: number;
}

export const getDailyFoodLog = async (
  date: string,
): Promise<DailyLogResponse> => {
  const { data } = await apiClient.get(`/food?date=${date}`);
  return {
    history: data.log?.food ?? [],
    water: data.log?.water ?? 0,
  };
};
