import { nanoid } from 'nanoid';
import { useState } from 'react';

import { TransactionType } from '@/screens/finance/finance.types';
import { useFinanceStore } from '@/store/finance';

export const useCategoryModal = (
  onClose: () => void,
  transactionType: TransactionType,
  onCategoryCreated: (id: string) => void,
) => {
  const [name, setName] = useState<string>('');
  const addCustomCategory = useFinanceStore(state => state.addCustomCategory);

  const handleCreate = () => {
    const newCategoryId = nanoid();
    addCustomCategory(newCategoryId, name, transactionType);
    onCategoryCreated(newCategoryId);
    setName('');
    onClose();
  };

  return {
    handleCreate,
    name,
    setName,
  };
};
