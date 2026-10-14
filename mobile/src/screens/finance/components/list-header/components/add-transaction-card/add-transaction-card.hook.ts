import { format } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';
import { useMemo } from 'react';

import { useActiveTranslation } from '@/hooks';
import { CURRENCIES } from '@/screens/finance/currency.constants';
import { TransactionType } from '@/screens/finance/finance.types';
import {
  useCategoryManager,
  useTransactionForm,
} from '@/screens/finance/hooks';

export const useAddTransactionCard = () => {
  const { t, i18n } = useActiveTranslation();

  const {
    control,
    isValid,
    error,
    transactionType,
    setTransactionType,
    currency,
    setCurrency,
    selectedDate,
    setSelectedDate,
    isDatePickerVisible,
    setIsDatePickerVisible,
    onAddTransactionPress,
  } = useTransactionForm();

  const {
    category,
    setCategory,
    dropdownCategories,
    customCategories,
    isAddCategoryModalVisible,
    setIsAddCategoryModalVisible,
    isDeleteCategoryModalVisible,
    setIsDeleteCategoryModalVisible,
    handleDeleteCategory,
    handleTypeChange: handleCategoryTypeChange,
  } = useCategoryManager(transactionType);

  const currencyOptions = useMemo(
    () =>
      CURRENCIES.map(c => ({ label: `${c.symbol} ${c.code}`, value: c.code })),
    [],
  );

  const transactionTypes = useMemo(
    () => [
      { label: t('Finance.transaction.expense'), value: 'expense' },
      { label: t('Finance.transaction.income'), value: 'income' },
    ],
    [t],
  );

  const handleTypeChange = (type: TransactionType) => {
    setTransactionType(type);
    handleCategoryTypeChange(type);
  };

  const formatedDate = format(new Date(selectedDate), 'd MMMM yyyy', {
    locale: i18n.language === 'ru' ? ru : enUS,
  });

  return {
    t,
    control,
    isValid,
    error,
    transactionType,
    currency,
    setCurrency,
    selectedDate,
    setSelectedDate,
    isDatePickerVisible,
    setIsDatePickerVisible,
    category,
    setCategory,
    dropdownCategories,
    customCategories,
    isAddCategoryModalVisible,
    setIsAddCategoryModalVisible,
    isDeleteCategoryModalVisible,
    setIsDeleteCategoryModalVisible,
    handleDeleteCategory,
    currencyOptions,
    transactionTypes,
    handleTypeChange,
    onAddTransactionPress,
    formatedDate,
  };
};
