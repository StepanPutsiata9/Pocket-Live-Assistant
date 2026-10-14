import { isPast, parse, set } from 'date-fns';
import notifee, {
  AndroidImportance,
  RepeatFrequency,
  TriggerType,
} from 'react-native-notify-kit';

import i18n from '@/i18n';
import { Task } from '@/types/task';

import { CHANNELS } from './constants';

export async function scheduleTaskReminder(task: Task) {
  if (!task.date || task.isCompleted) return;

  const dueDay = parse(task.date, 'yyyy-MM-dd', new Date());
  const remindAt = set(dueDay, {
    hours: 9,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  if (isPast(remindAt)) return;

  await notifee.createTriggerNotification(
    {
      id: `task_${task.id}`,
      title: i18n.t('Notifications.dailyTasksPushTitle'),
      body: task.title,
      android: {
        channelId: CHANNELS.CLEANING_CHANNEL_ID,
        importance: AndroidImportance.HIGH,
        pressAction: { id: 'default' },
      },
    },
    {
      type: TriggerType.TIMESTAMP,
      timestamp: remindAt.getTime(),
      repeatFrequency: RepeatFrequency.NONE,
    },
  );
}

export async function cancelTaskReminder(taskId: string) {
  await notifee.cancelNotification(`task_${taskId}`);
}
