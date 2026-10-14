import apiClient from '@/api/api-client';

import {
  ClearFoodPayload,
  SyncFoodPayload,
  SyncWaterPayload,
} from './meals.types';

export const syncFoodWithBackend = async (payload: SyncFoodPayload) => {
  const { data } = await apiClient.post('/food', payload);
  return data.log;
};

export const syncWaterWithBackendApi = async (payload: SyncWaterPayload) => {
  const { data } = await apiClient.post('/food/water', payload);
  return data.log;
};

export const clearFoodHistoryApi = async (payload: ClearFoodPayload) => {
  const { data } = await apiClient.post('/food/clear', payload);
  return data.log;
};
