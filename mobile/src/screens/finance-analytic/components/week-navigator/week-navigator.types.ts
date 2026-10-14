export interface PeriodNavigatorProps {
  rangeStart: Date;
  rangeEnd: Date;
  offset: number;
  period: 'week' | 'month';
  onPrev: () => void;
  onNext: () => void;
}
