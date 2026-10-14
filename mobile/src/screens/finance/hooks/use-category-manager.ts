import { useMemo, useState } from 'react';

import { useActiveTranslation } from '@/hooks';
import { TransactionType } from '@/screens/finance/finance.types';
import { useFilteredCategories, useFinanceStore } from '@/store/finance';

export const useCategoryManager = (transactionType: TransactionType) => {
  const { t } = useActiveTranslation();
  const { deleteCustomCategory } = useFinanceStore();

  const [category, setCategory] = useState(
    transactionType === 'expense' ? 'food' : 'salary',
  );
  const [isAddCategoryModalVisible, setIsAddCategoryModalVisible] =
    useState(false);
  const [isDeleteCategoryModalVisible, setIsDeleteCategoryModalVisible] =
    useState(false);

  const availableCategories = useFilteredCategories(transactionType);

  const customCategories = useMemo(
    () => availableCategories.filter(cat => cat.isCustom),
    [availableCategories],
  );

  const dropdownCategories = useMemo(
    () =>
      availableCategories.map(cat => ({
        label: cat.isCustom ? cat.name : t(`Finance.categories.${cat.name}`),
        value: cat.id,
      })),
    [availableCategories, t],
  );

  const handleTypeChange = (type: TransactionType) => {
    setCategory(type === 'expense' ? 'food' : 'salary');
  };

  const handleDeleteCategory = (id: string) => {
    if (category === id) {
      setCategory(transactionType === 'expense' ? 'food' : 'salary');
    }
    deleteCustomCategory(id);
  };

  return {
    category,
    setCategory,
    dropdownCategories,
    customCategories,
    isAddCategoryModalVisible,
    setIsAddCategoryModalVisible,
    isDeleteCategoryModalVisible,
    setIsDeleteCategoryModalVisible,
    handleDeleteCategory,
    handleTypeChange,
  };
};
