import { priorityOptions } from '@screens/cleaning/cleaning.constants';
import { useTaskActions } from '@store/cleaning';
import { format } from 'date-fns';
import { useCallback, useMemo, useRef, useState } from 'react';

import { useActiveTranslation } from '@/hooks';
import { Priority } from '@/types/task';

export const useNewTaskForm = () => {
  const { t } = useActiveTranslation();
  const { addTask } = useTaskActions();

  const [isOptionsExpanded, setIsOptionsExpanded] = useState<boolean>(false);
  const [isDateEnabled, setIsDateEnabled] = useState<boolean>(false);

  const [priority, setPriority] = useState<Priority>('noPriority');
  const [title, setTitle] = useState<string>('');
  const room = useRef<string>('');
  const [selectedDate, setSelectedDate] = useState(() =>
    format(new Date(), 'yyyy-MM-dd'),
  );

  const onPress = useCallback(() => {
    setIsOptionsExpanded(prevState => !prevState);
  }, []);

  const handleRoomChange = useCallback((text: string) => {
    room.current = text;
  }, []);

  const handlePrioritySelect = useCallback((val: string) => {
    setPriority(val as Priority);
  }, []);

  const handleSubmit = useCallback(() => {
    if (title.trim()) {
      addTask({
        title: title,
        priority: priority,
        room: room.current || t('Cleaning.generalSection'),
        ...(isDateEnabled && { date: selectedDate }),
      });
      setTitle('');
      setPriority('noPriority');
      room.current = '';
      setIsOptionsExpanded(false);
      setIsDateEnabled(false);
    }
  }, [addTask, isDateEnabled, priority, selectedDate, t, title]);

  const priorityLabels = useMemo(
    () => ({
      noPriority: t('Cleaning.priorities.noPriority'),
      lowPriority: t('Cleaning.priorities.lowPriority'),
      mediumPriority: t('Cleaning.priorities.normal'),
      highPriority: t('Cleaning.priorities.important'),
    }),
    [t],
  );

  const priorityDropdownData = useMemo(() => {
    return priorityOptions.map(p => ({
      label: priorityLabels[p],
      value: p,
    }));
  }, [priorityLabels]);

  return {
    isOptionsExpanded,
    onPress,
    t,
    priorityDropdownData,
    priority,
    setPriority,
    title,
    setTitle,
    room,
    isDateEnabled,
    setIsDateEnabled,
    selectedDate,
    setSelectedDate,
    handlePrioritySelect,
    handleRoomChange,
    handleSubmit,
  };
};
