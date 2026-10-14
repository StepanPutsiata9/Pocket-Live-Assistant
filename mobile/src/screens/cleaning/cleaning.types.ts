import { Priority, Task } from '@/types/task.ts';

export interface TaskSection {
  title: string;
  data: Task[];
}

export type PriorityWeights = Record<Priority, number>;
