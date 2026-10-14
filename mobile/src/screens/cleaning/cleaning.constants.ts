import { Priority } from '@/types/task.ts';

import { PriorityWeights } from './cleaning.types.ts';

export const priorityOptions: Priority[] = [
  'noPriority',
  'lowPriority',
  'mediumPriority',
  'highPriority',
];

export const priorityWeights: PriorityWeights = {
  noPriority: 0,
  lowPriority: 1,
  mediumPriority: 2,
  highPriority: 3,
};
