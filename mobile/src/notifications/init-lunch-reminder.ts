import notifee, {
  AndroidImportance,
  RepeatFrequency,
  TriggerType,
} from 'react-native-notify-kit';

import i18n from '@/i18n';

import { CHANNELS, IDS } from './constants';

export async function initLunchReminder() {
  //   const triggerTimestamp = Date.now() + 10000;
  const target = new Date();
  target.setHours(13, 0, 0, 0);

  if (target.getTime() <= Date.now()) {
    target.setDate(target.getDate() + 1);
  }

  await notifee.createTriggerNotification(
    {
      id: IDS.LUNCH_REMINDER,
      title: i18n.t('Notifications.lunchPushTitle'),
      body: i18n.t('Notifications.lunchPushMessage'),
      android: {
        channelId: CHANNELS.FOOD_CHANNEL_ID,
        importance: AndroidImportance.HIGH,
        pressAction: { id: 'default' },
      },
    },
    {
      type: TriggerType.TIMESTAMP,
      timestamp: target.getTime(),
      //   timestamp: triggerTimestamp,
      repeatFrequency: RepeatFrequency.DAILY,
    },
  );
}
