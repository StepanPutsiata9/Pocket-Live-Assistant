import { format } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';
import i18n from 'i18next';

import { Priority } from '@/types/task';

const PRIORITY_MARKS: Record<Priority, string> = {
  noPriority: '',
  lowPriority: '!',
  mediumPriority: '!!',
  highPriority: '!!!',
};

export const getPriorityExclamation = (priority: Priority): string => {
  return PRIORITY_MARKS[priority];
};

export const formatDate = (date: string) => {
  const formattedDate = format(new Date(date), 'dd MMMM yyyy', {
    locale: i18n.language === 'ru' ? ru : enUS,
  });
  return formattedDate;
};
