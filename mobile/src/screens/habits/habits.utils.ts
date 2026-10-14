import { addDays, format, getDay } from 'date-fns';

const DAYS_ORDER = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const getTodayString = (): string => format(new Date(), 'yyyy-MM-dd');

export const defineMarkDate = (
  days: string[],
  fromDate = new Date(),
): string => {
  if (!days || days.length === 0) return format(fromDate, 'yyyy-MM-dd');

  const currentDayIndex = getDay(fromDate);
  const targetDayIndexes = days.map(day => DAYS_ORDER.indexOf(day));

  for (let daysAhead = 0; daysAhead < 7; daysAhead++) {
    const checkDayIndex = (currentDayIndex + daysAhead) % 7;

    if (targetDayIndexes.includes(checkDayIndex)) {
      const targetDate = addDays(fromDate, daysAhead);
      return format(targetDate, 'yyyy-MM-dd');
    }
  }

  return format(fromDate, 'yyyy-MM-dd');
};
