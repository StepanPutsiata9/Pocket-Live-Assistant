import { useMutation, useQuery } from '@tanstack/react-query';
import { useRef } from 'react';

import { queryClient } from '@/api';
import {
  cancelTaskReminder,
  scheduleTaskReminder,
} from '@/notifications/init-daily-tasks-reminder';
import { AddTaskPayload, pullTasks, pushTasks } from '@/services';
import {
  addTaskReducer,
  clearCompletedTasksReducer,
  deleteTaskReducer,
  markSynced,
  mergeTasks,
  toggleTaskReducer,
} from '@/store/cleaning/cleaning.utils';
import { Task } from '@/types/task';

export const CLEANING_KEYS = {
  tasks: ['tasks'] as const,
};

export const useTasks = () => {
  return useQuery<Task[]>({
    queryKey: CLEANING_KEYS.tasks,
    queryFn: () => queryClient.getQueryData<Task[]>(CLEANING_KEYS.tasks) ?? [],
    initialData: [],
    staleTime: Infinity,
  });
};

export const useSyncTasks = () => {
  const lastPulledAtRef = useRef<string | null>(null);

  return useMutation({
    mutationFn: async () => {
      const localTasks =
        queryClient.getQueryData<Task[]>(CLEANING_KEYS.tasks) ?? [];

      const pending = localTasks.filter(t => t.syncStatus === 'pending');

      if (pending.length > 0) {
        await pushTasks(pending);

        queryClient.setQueryData<Task[]>(CLEANING_KEYS.tasks, old =>
          markSynced(
            old ?? [],
            pending.map(t => t.id),
          ),
        );
      }
      const remote = await pullTasks(lastPulledAtRef.current);
      lastPulledAtRef.current = new Date().toISOString();

      queryClient.setQueryData<Task[]>(CLEANING_KEYS.tasks, currentLocal =>
        mergeTasks(currentLocal ?? [], remote),
      );
    },
  });
};

export const useTaskActions = () => {
  const { mutate: sync } = useSyncTasks();

  const addTask = (payload: AddTaskPayload) => {
    queryClient.setQueryData<Task[]>(CLEANING_KEYS.tasks, old => {
      const updated = addTaskReducer(old ?? [], payload);
      const addedTask = updated.at(-1);

      if (addedTask?.date) {
        scheduleTaskReminder(addedTask);
      }
      return updated;
    });

    sync();
  };

  const toggleTask = (id: string) => {
    queryClient.setQueryData<Task[]>(CLEANING_KEYS.tasks, old => {
      const updated = toggleTaskReducer(old ?? [], id);
      const task = updated.find(t => t.id === id);

      if (task) {
        if (task.isCompleted) {
          cancelTaskReminder(id);
        } else if (task.date) {
          scheduleTaskReminder(task);
        }
      }
      return updated;
    });

    sync();
  };

  const deleteTask = (id: string) => {
    queryClient.setQueryData<Task[]>(CLEANING_KEYS.tasks, old =>
      deleteTaskReducer(old ?? [], id),
    );
    cancelTaskReminder(id);
    sync();
  };

  const clearCompletedTasks = () => {
    queryClient.setQueryData<Task[]>(CLEANING_KEYS.tasks, old =>
      clearCompletedTasksReducer(old ?? []),
    );
    sync();
  };

  return {
    addTask,
    toggleTask,
    deleteTask,
    clearCompletedTasks,
    syncTasks: sync,
  };
};

export const useUncompletedTasksCount = () => {
  return useQuery<Task[], Error, number>({
    queryKey: CLEANING_KEYS.tasks,
    queryFn: () => queryClient.getQueryData<Task[]>(CLEANING_KEYS.tasks) ?? [],
    initialData: [],
    staleTime: Infinity,
    select: tasks =>
      tasks.reduce(
        (acc, task) => (!task.isCompleted && !task.isDeleted ? acc + 1 : acc),
        0,
      ),
  });
};
