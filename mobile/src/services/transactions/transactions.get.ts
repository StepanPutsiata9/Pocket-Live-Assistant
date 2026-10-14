import apiClient from '@/api/api-client';
import { Transaction } from '@/screens/finance';

export const getTransactions = async (): Promise<Transaction[]> => {
  const { data } = await apiClient.get('/transactions');
  return data.transactions;
};
