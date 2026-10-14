import { TransactionType } from '@/screens/finance/finance.types';

export interface AddCategoryModalProps {
  visible: boolean;
  onClose: () => void;
  transactionType: TransactionType;
  onCategoryCreated: (id: string) => void;
}
