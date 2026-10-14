import apiClient from '@/api/api-client';

export const deleteMood = async (id: string): Promise<void> => {
  await apiClient.delete(`/mood/${id}`);
};
