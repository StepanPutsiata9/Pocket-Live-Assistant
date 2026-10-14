export interface CategoryEntry {
  id: string;
  label: string;
  amount: number;
}

export interface CategoryChartProps {
  titleKey: string;
  categories: CategoryEntry[];
}
