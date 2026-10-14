import { format, parseISO } from 'date-fns';

export const dateStringToDate = (dateString?: string): Date =>
  dateString ? parseISO(dateString) : new Date();

export const dateToDateString = (date: Date): string =>
  format(date, 'yyyy-MM-dd');
