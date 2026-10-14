import { Currency } from './currency.constants';

export type TransactionType = 'expense' | 'income';
export type CategoryType = 'food' | 'transport' | 'shopping' | 'other';

export interface DropdownItem<T extends string> {
  label: string;
  value: T;
}
export interface Transaction {
  id: string;
  type: TransactionType;
  description: string;
  amount: number;
  category: string;
  date: string;
  currency: Currency;
  createdAt?: string;
}
export interface Category {
  id: string;
  name: string;
  type: TransactionType;
  isCustom?: boolean;
}
export type ActionPayload = Omit<Transaction, 'id'>;
