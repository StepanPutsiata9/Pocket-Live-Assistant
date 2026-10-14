import notifee, {
  AndroidImportance,
  RepeatFrequency,
  TriggerType,
} from 'react-native-notify-kit';

import i18n from '@/i18n';

import { CHANNELS, IDS } from './constants';

export async function initDailyExpenseReminder() {
  const target = new Date();
  target.setHours(15, 0, 0, 0);

  if (target.getTime() <= Date.now()) {
    target.setDate(target.getDate() + 1);
  }

  await notifee.createTriggerNotification(
    {
      id: IDS.DAILY_EXPENSE,
      title: i18n.t('Notifications.dailyExpensePushTitle'),
      body: i18n.t('Notifications.dailyExpensePushMessage'),
      android: {
        channelId: CHANNELS.EXPENSE_CHANNEL_ID,
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
