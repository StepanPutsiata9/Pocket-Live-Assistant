import { useTransactions } from '@/store/finance';

export const useBalance = () => {
  const { balance } = useTransactions();
  const prefix = balance < 0 ? '-' : '';
  return { formattedBalance: `${prefix}${Math.abs(balance).toFixed(2)}` };
};
