import apiClient from '@/api/api-client';

import { MoodEntry } from './mood.types';

export const upsertMood = async (payload: {
  date: string;
  moodIndex: number;
}): Promise<MoodEntry> => {
  const { data } = await apiClient.post('/mood', payload);
  return data.mood;
};
