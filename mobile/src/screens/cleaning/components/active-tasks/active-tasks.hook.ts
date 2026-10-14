import { priorityWeights } from '@screens/cleaning/cleaning.constants';
import { TaskSection } from '@screens/cleaning/cleaning.types';
import {
  useTaskActions,
  useTasks,
  useUncompletedTasksCount,
} from '@store/cleaning';
import { useMemo } from 'react';

import { useActiveTranslation } from '@/hooks';

export const useActiveTasks = () => {
  const { t } = useActiveTranslation();
  const { data: tasks = [] } = useTasks();
  const { toggleTask, deleteTask } = useTaskActions();
  const { data: activeTasksCount = 0 } = useUncompletedTasksCount();

  const sections = useMemo(() => {
    const visible = tasks.filter(task => !task.isDeleted);
    const activeTasks = visible.filter(task => !task.isCompleted);

    const roomsMap: Record<string, typeof tasks> = {};

    activeTasks.forEach(task => {
      const roomName = task.room || t('Cleaning.generalSection');
      if (!roomsMap[roomName]) {
        roomsMap[roomName] = [];
      }
      roomsMap[roomName].push(task);
    });

    const formattedSections: TaskSection[] = Object.keys(roomsMap)
      .sort()
      .map(roomName => ({
        title: roomName,
        data:
          roomsMap[roomName]?.sort((a, b) => {
            const weightA = priorityWeights[a.priority] || 0;
            const weightB = priorityWeights[b.priority] || 0;

            if (weightB !== weightA) return weightB - weightA;

            if (a.date && b.date) {
              if (a.date !== b.date) return a.date.localeCompare(b.date);
            }

            if (a.date && !b.date) return -1;
            if (!a.date && b.date) return 1;

            return a.title.localeCompare(b.title);
          }) ?? [],
      }));

    return formattedSections;
  }, [tasks, t]);

  return {
    t,
    activeTasksCount,
    sections,
    toggleTask,
    deleteTask,
  };
};
