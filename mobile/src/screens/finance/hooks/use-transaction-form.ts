import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import {
  Currency,
  DEFAULT_CURRENCY,
} from '@/screens/finance/currency.constants';
import { TransactionType } from '@/screens/finance/finance.types';
import { useAddTransaction } from '@/store/finance';

export interface TransactionFormData {
  transactionType: TransactionType;
  description: string;
  amount: number | null;
  selectedDate: string;
  currency: Currency;
}

const transactionSchemaStatic = yup
  .object({
    transactionType: yup
      .mixed<TransactionType>()
      .oneOf(['expense', 'income'])
      .required(),
    description: yup.string().required('Finance.errorEmptyFields'),
    amount: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === '' ? null : value,
      )
      .typeError('Finance.errorInvalidNumber')
      .positive('Finance.errorPositiveNumber')
      .required('Finance.errorEmptyFields')
      .nullable(),
    selectedDate: yup.string().required(),
    currency: yup.mixed<Currency>().required(),
  })
  .required();

export const useTransactionForm = () => {
  const { mutate: addTransaction } = useAddTransaction();
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<TransactionFormData>({
    resolver: yupResolver(transactionSchemaStatic),
    mode: 'onChange',
    defaultValues: {
      transactionType: 'expense',
      description: '',
      amount: null,
      selectedDate: new Date().toISOString().split('T')[0] ?? '',
      currency: DEFAULT_CURRENCY,
    },
  });

  const transactionType = watch('transactionType');
  const description = watch('description');
  const amount = watch('amount');
  const currency = watch('currency');
  const selectedDate = watch('selectedDate');

  const handleTypeChange = (type: TransactionType) => {
    setValue('transactionType', type, { shouldValidate: true });
  };

  const handleAddTransaction = (
    data: TransactionFormData,
    category: string,
  ) => {
    if (data.amount === null) return;

    addTransaction({
      type: data.transactionType,
      description: data.description.trim(),
      amount: data.amount,
      category,
      date: new Date(data.selectedDate).toISOString(),
      currency: data.currency,
    });

    reset({
      transactionType: data.transactionType,
      description: '',
      amount: null,
      selectedDate: data.selectedDate,
      currency: data.currency,
    });
  };

  const errorKey = errors.description?.message || errors.amount?.message;

  return {
    control,
    isValid,
    error: errorKey || '',
    transactionType,
    setTransactionType: handleTypeChange,
    description,
    amount,
    currency,
    setCurrency: (curr: Currency) => setValue('currency', curr),
    selectedDate,
    setSelectedDate: (date: string) => setValue('selectedDate', date),
    isDatePickerVisible,
    setIsDatePickerVisible,
    onAddTransactionPress: (category: string) =>
      handleSubmit(data => handleAddTransaction(data, category))(),
  };
};
