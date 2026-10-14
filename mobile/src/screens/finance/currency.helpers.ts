import { CURRENCIES, Currency, CurrencyConfig } from './currency.constants';

export const getCurrencyConfig = (code: Currency): CurrencyConfig =>
  CURRENCIES.find(c => c.code === code) ?? CURRENCIES[0]!;

export const toUSD = (amount: number, currency: Currency): number =>
  amount * getCurrencyConfig(currency).rateToUSD;

export const formatAmount = (amount: number, currency: Currency): string => {
  const { symbol } = getCurrencyConfig(currency);
  return `${amount.toFixed(2)} ${symbol}`;
};
