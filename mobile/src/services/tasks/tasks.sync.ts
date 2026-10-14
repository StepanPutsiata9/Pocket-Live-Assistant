import apiClient from '@/api/api-client';
import { Task } from '@/types/task';

import { SyncTaskPayload } from './tasks.types';

export const pushTasks = async (tasks: Task[]): Promise<void> => {
  await apiClient.post('/tasks/sync', {
    tasks: tasks.map(
      (t): SyncTaskPayload => ({
        _id: t.id,
        title: t.title,
        priority: t.priority,
        room: t.room,
        date: t.date,
        isCompleted: t.isCompleted,
        isDeleted: t.isDeleted,
      }),
    ),
  });
};

export const pullTasks = async (since: string | null): Promise<Task[]> => {
  const { data } = await apiClient.get('/tasks/sync', {
    params: since ? { since } : undefined,
  });
  return data.changes;
};
