export const chartColors = {
  balance: '#4069E1',
  income: '#05CD99',
  warning: '#F4A825',
  accent: '#7B5CE6',
  expense: '#E26150',
  teal: '#10808E',
} as const;

export const chartColorValues = Object.values(chartColors) as string[];

export const getChartColor = (
  i: number,
  colors: string[] = chartColorValues,
) => (i < colors.length ? colors[i] : `hsl(${(i * 137.5) % 360}, 65%, 55%)`);

export type ChartColors = typeof chartColors;
