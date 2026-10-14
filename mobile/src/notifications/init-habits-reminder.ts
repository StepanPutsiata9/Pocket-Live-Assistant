import notifee, {
  AndroidImportance,
  RepeatFrequency,
  TriggerType,
} from 'react-native-notify-kit';

import i18n from '@/i18n';

import { CHANNELS, IDS } from './constants';

export async function initDailyHabitsReminder() {
  const target = new Date();
  target.setHours(14, 0, 0, 0);

  if (target.getTime() <= Date.now()) {
    target.setDate(target.getDate() + 1);
  }

  await notifee.createTriggerNotification(
    {
      id: IDS.HABITS_REMINDER,
      title: i18n.t('Notifications.dailyHabitsPushTitle'),
      body: i18n.t('Notifications.dailyHabitsPushMessage'),
      android: {
        channelId: CHANNELS.HABITS_CHANNEL_ID,
        importance: AndroidImportance.HIGH,
        pressAction: { id: 'default' },
      },
    },
    {
      type: TriggerType.TIMESTAMP,
      timestamp: target.getTime(),
      repeatFrequency: RepeatFrequency.DAILY,
    },
  );
}
