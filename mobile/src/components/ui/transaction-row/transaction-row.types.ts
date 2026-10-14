import { Transaction } from '@/screens/finance/finance.types';

export interface TransactionRowProps {
  item: Transaction;
  categoryLabel: string;
  formattedDate: string;
  formattedAmount: string;
  onDelete?: () => void;
}
