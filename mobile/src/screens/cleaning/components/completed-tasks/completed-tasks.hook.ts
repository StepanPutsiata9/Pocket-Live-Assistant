import { useMemo } from 'react';

import { useActiveTranslation } from '@/hooks';
import { useTaskActions, useTasks } from '@/store/cleaning';

export const useCompletedTasks = () => {
  const { t } = useActiveTranslation();
  const { data: tasks = [] } = useTasks();
  const { toggleTask, deleteTask, clearCompletedTasks } = useTaskActions();

  const completedTasks = useMemo(() => {
    return tasks.filter(task => !task.isDeleted && task.isCompleted);
  }, [tasks]);

  return {
    t,
    completedTasks,
    toggleTask,
    deleteTask,
    clearCompletedTasks,
  };
};
