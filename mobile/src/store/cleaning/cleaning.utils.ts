import { nanoid } from 'nanoid';

import { AddTaskPayload } from '@/services';
import { Task } from '@/types/task';

const now = () => new Date().toISOString();

export const addTaskReducer = (
  tasks: Task[],
  payload: AddTaskPayload,
): Task[] => {
  const title = payload.title.trim();
  if (!title) return tasks;

  const newTask: Task = {
    id: nanoid(),
    title,
    priority: payload.priority,
    room: payload.room,
    isCompleted: false,
    isDeleted: false,
    updatedAt: now(),
    syncStatus: 'pending',
    date: payload.date,
  };

  return [...tasks, newTask];
};

export const toggleTaskReducer = (tasks: Task[], id: string): Task[] => {
  return tasks.map(task =>
    task.id === id
      ? {
          ...task,
          isCompleted: !task.isCompleted,
          updatedAt: now(),
          syncStatus: 'pending',
        }
      : task,
  );
};

export const deleteTaskReducer = (tasks: Task[], id: string): Task[] => {
  return tasks.map(task =>
    task.id === id
      ? {
          ...task,
          isDeleted: true,
          updatedAt: now(),
          syncStatus: 'pending',
        }
      : task,
  );
};

export const clearCompletedTasksReducer = (tasks: Task[]): Task[] => {
  return tasks.map(task =>
    task.isCompleted && !task.isDeleted
      ? {
          ...task,
          isDeleted: true,
          updatedAt: now(),
          syncStatus: 'pending',
        }
      : task,
  );
};

export const markSynced = (tasks: Task[], ids: string[]): Task[] => {
  const syncedIds = new Set(ids);
  return tasks.map(task =>
    syncedIds.has(task.id)
      ? {
          ...task,
          syncStatus: 'synced',
        }
      : task,
  );
};

export const evictSyncedDeletedTasks = (tasks: Task[]): Task[] =>
  tasks.filter(task => !(task.isDeleted && task.syncStatus === 'synced'));

export const mergeTasks = (local: Task[], remote: Task[]): Task[] => {
  const byId = new Map(local.map(task => [task.id, task]));

  for (const remoteTask of remote) {
    const localTask = byId.get(remoteTask.id);

    if (localTask?.syncStatus === 'pending') continue;

    if (
      !localTask ||
      new Date(remoteTask.updatedAt) > new Date(localTask.updatedAt)
    ) {
      byId.set(remoteTask.id, { ...remoteTask, syncStatus: 'synced' });
    }
  }

  return [...byId.values()];
};
