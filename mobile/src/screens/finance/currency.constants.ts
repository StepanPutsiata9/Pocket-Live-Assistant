export type Currency = 'USD' | 'EUR' | 'BYN' | 'GBP' | 'PLN';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  rateToUSD: number;
}

export const CURRENCIES: CurrencyConfig[] = [
  { code: 'USD', symbol: '$', rateToUSD: 1 },
  { code: 'EUR', symbol: '€', rateToUSD: 1.08 },
  { code: 'GBP', symbol: '£', rateToUSD: 1.27 },
  { code: 'BYN', symbol: 'Br', rateToUSD: 0.31 },
  { code: 'PLN', symbol: 'zł', rateToUSD: 0.25 },
];

export const DEFAULT_CURRENCY: Currency = 'USD';
