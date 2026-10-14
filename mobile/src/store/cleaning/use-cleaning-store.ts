import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import {
  cancelTaskReminder,
  scheduleTaskReminder,
} from '@/notifications/init-daily-tasks-reminder';
import type { CreateTaskPayload } from '@/services';
import { pullTasks, pushTasks } from '@/services';
import { mmkvTasksStorage } from '@/store/mmkv-storage';
import { Task } from '@/types/task';

import {
  addTaskReducer,
  clearCompletedTasksReducer,
  deleteTaskReducer,
  evictSyncedDeletedTasks,
  markSynced,
  mergeTasks,
  toggleTaskReducer,
} from './cleaning.utils';

export type AddTaskPayload = Omit<CreateTaskPayload, '_id'>;

type CleaningStore = {
  tasks: Task[];
  lastPulledAt: string | null;
  isSyncing: boolean;
  syncFailed: boolean;

  addTask: (payload: AddTaskPayload) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  clearCompletedTasks: () => void;
  syncTasks: () => Promise<void>;
};

export const useCleaningStore = create<CleaningStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      lastPulledAt: null,
      isSyncing: false,
      syncFailed: false,

      addTask: payload => {
        set(state => ({
          tasks: addTaskReducer(state.tasks, payload),
        }));
        const addedTask = get().tasks.at(-1);
        if (addedTask?.date) {
          scheduleTaskReminder(addedTask);
        }
        get().syncTasks();
      },

      toggleTask: id => {
        set(state => ({
          tasks: toggleTaskReducer(state.tasks, id),
        }));
        const task = get().tasks.find(t => t.id === id);
        if (task) {
          if (task.isCompleted) {
            cancelTaskReminder(id);
          } else if (task.date) {
            scheduleTaskReminder(task);
          }
        }
        get().syncTasks();
      },

      deleteTask: id => {
        set(state => ({
          tasks: deleteTaskReducer(state.tasks, id),
        }));
        cancelTaskReminder(id);
        get().syncTasks();
      },

      clearCompletedTasks: () => {
        set(state => ({
          tasks: clearCompletedTasksReducer(state.tasks),
        }));
        get().syncTasks();
      },

      syncTasks: async () => {
        if (get().isSyncing) return;
        set({ isSyncing: true });
        try {
          const pending = get().tasks.filter(t => t.syncStatus === 'pending');
          if (pending.length) {
            await pushTasks(pending);
            set(state => ({
              tasks: markSynced(
                state.tasks,
                pending.map(t => t.id),
              ),
            }));
          }
          const remote = await pullTasks(get().lastPulledAt);
          set(state => ({
            tasks: evictSyncedDeletedTasks(
              mergeTasks(state.tasks, remote),
            ),
            lastPulledAt: new Date().toISOString(),
          }));
        } catch {
          set({ syncFailed: true });
        } finally {
          set({ isSyncing: false });
        }
      },
    }),
    {
      name: 'tasks-cache',
      storage: createJSONStorage(() => mmkvTasksStorage),
      partialize: state => ({
        tasks: state.tasks,
        lastPulledAt: state.lastPulledAt,
      }),
    },
  ),
);

export const useUncompletedTasksCount = () =>
  useCleaningStore(state =>
    state.tasks.reduce(
      (acc, task) => (!task.isCompleted && !task.isDeleted ? acc + 1 : acc),
      0,
    ),
  );
