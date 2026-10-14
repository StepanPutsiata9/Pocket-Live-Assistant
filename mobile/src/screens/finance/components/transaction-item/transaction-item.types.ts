import { Transaction } from '@/screens/finance/finance.types';

export interface TransactionItemProps {
  item: Transaction;
  onDelete?: (id: string) => void;
}
