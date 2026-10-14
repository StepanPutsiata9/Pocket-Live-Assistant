import apiClient from '@/api/api-client';

import { MoodEntry } from './mood.types';

export const getMoods = async (): Promise<MoodEntry[]> => {
  const { data } = await apiClient.get('/mood');
  return data.moods;
};
