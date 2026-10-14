import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  clearFoodHistoryApi,
  getDailyFoodLog,
  syncFoodWithBackend,
  syncWaterWithBackendApi,
} from '@/services';
import { SyncFoodPayload } from '@/services/meals/meals.types';
import { AddFoodPayload, FoodItem } from '@/store/food/food.types';
import { calcDailyStats, calcMealCalories } from '@/store/food/food.utils';
import { useFoodUIStore } from '@/store/food/use-food-store';

export const FOOD_KEYS = {
  all: ['food'] as const,
  dayLog: (date: string) => ['food', date] as const,
};

export const useDailyFoodLog = () => {
  const selectedDate = useFoodUIStore(s => s.selectedDate);

  return useQuery({
    queryKey: FOOD_KEYS.dayLog(selectedDate),
    queryFn: () => getDailyFoodLog(selectedDate),
    staleTime: 1000 * 60 * 5,
  });
};

export const useSelectedDateWater = () => {
  const selectedDate = useFoodUIStore(s => s.selectedDate);

  return useQuery({
    queryKey: FOOD_KEYS.dayLog(selectedDate),
    queryFn: () => getDailyFoodLog(selectedDate),
    select: data => data.water,
  });
};

export const useDailyStats = () => {
  const selectedDate = useFoodUIStore(s => s.selectedDate);

  return useQuery({
    queryKey: FOOD_KEYS.dayLog(selectedDate),
    queryFn: () => getDailyFoodLog(selectedDate),
    select: data => calcDailyStats(data.history),
  });
};

export const useMealCalories = () => {
  const selectedDate = useFoodUIStore(s => s.selectedDate);

  return useQuery({
    queryKey: FOOD_KEYS.dayLog(selectedDate),
    queryFn: () => getDailyFoodLog(selectedDate),
    select: data => calcMealCalories(data.history),
  });
};

export const useSetWaterAmount = () => {
  const queryClient = useQueryClient();
  const selectedDate = useFoodUIStore(s => s.selectedDate);

  return useMutation({
    mutationFn: (amount: number) =>
      syncWaterWithBackendApi({ date: selectedDate, amount }),

    onMutate: async newAmount => {
      const queryKey = FOOD_KEYS.dayLog(selectedDate);
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<{
        history: FoodItem[];
        water: number;
      }>(queryKey);

      if (previousData) {
        queryClient.setQueryData(queryKey, {
          ...previousData,
          water: Math.max(0, (previousData.water || 0) + newAmount),
        });
      }

      return { previousData };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          FOOD_KEYS.dayLog(selectedDate),
          context.previousData,
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: FOOD_KEYS.dayLog(selectedDate),
      });
    },
  });
};

export const useAddFood = () => {
  const queryClient = useQueryClient();
  const selectedDate = useFoodUIStore(s => s.selectedDate);

  return useMutation({
    mutationFn: (payload: AddFoodPayload) => {
      const syncPayload: SyncFoodPayload = {
        date: selectedDate,
        type: payload.type,
        name: payload.name.trim(),
        calories: payload.caloriesInput?.trim() || '0',
        protein: payload.protein?.trim() || '0',
        fats: payload.fats?.trim() || '0',
        carbs: payload.carbs?.trim() || '0',
      };

      return syncFoodWithBackend(syncPayload);
    },

    onMutate: async payload => {
      const queryKey = FOOD_KEYS.dayLog(selectedDate);
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<{
        history: FoodItem[];
        water: number;
      }>(queryKey);

      if (previousData) {
        const parsedCalories = parseInt(payload.caloriesInput || '0', 10) || 0;

        const newItem: FoodItem = {
          id: `temp-${Date.now()}`,
          type: payload.type,
          name: payload.name.trim(),
          calories: parsedCalories,
          protein: payload.protein?.trim() || undefined,
          fats: payload.fats?.trim() || undefined,
          carbs: payload.carbs?.trim() || undefined,
          createdAt: new Date().toISOString(),
        };

        queryClient.setQueryData(queryKey, {
          ...previousData,
          history: [newItem, ...previousData.history],
        });
      }

      return { previousData };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          FOOD_KEYS.dayLog(selectedDate),
          context.previousData,
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: FOOD_KEYS.dayLog(selectedDate),
      });
    },
  });
};

export const useClearFoodHistory = () => {
  const queryClient = useQueryClient();
  const selectedDate = useFoodUIStore(s => s.selectedDate);

  return useMutation({
    mutationFn: () => clearFoodHistoryApi({ date: selectedDate }),

    onMutate: async () => {
      const queryKey = FOOD_KEYS.dayLog(selectedDate);
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<{
        history: FoodItem[];
        water: number;
      }>(queryKey);

      if (previousData) {
        queryClient.setQueryData(queryKey, {
          ...previousData,
          history: [],
        });
      }

      return { previousData };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          FOOD_KEYS.dayLog(selectedDate),
          context.previousData,
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: FOOD_KEYS.dayLog(selectedDate),
      });
    },
  });
};
