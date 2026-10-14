import apiClient from '@/api/api-client';

export const deleteTransaction = async (id: string): Promise<void> => {
  await apiClient.delete(`/transactions/${id}`);
};
