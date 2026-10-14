import apiClient from '@/api/api-client';
import { ActionPayload, Transaction } from '@/screens/finance';

export const createTransaction = async (
  payload: ActionPayload,
): Promise<Transaction> => {
  const { data } = await apiClient.post('/transactions', payload);
  return data.transaction;
};
