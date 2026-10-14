import {
  getInitialNotification,
  getMessaging,
  onMessage,
  onNotificationOpenedApp,
  onTokenRefresh,
} from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';
import notifee, { AndroidImportance, EventType } from 'react-native-notify-kit';

import i18n from '@/i18n';
import { navigateFromNotificationData } from '@/navigation';
import { initDailyHabitsReminder } from '@/notifications/init-habits-reminder.ts';
import { saveTokenToServer } from '@/services';

import { CHANNELS } from './constants';
import { initDailyExpenseReminder } from './init-daily-expense-reminder';
import { initLunchReminder } from './init-lunch-reminder';

async function requestPermissions() {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  const settings = await notifee.requestPermission();
  return settings.authorizationStatus >= 1;
}

export const notificationService = {
  initAllNotifications: async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return () => {};

    await notifee.createChannel({
      id: CHANNELS.CLEANING_CHANNEL_ID,
      name: i18n.t('Notifications.cleaning_channel'),
      importance: AndroidImportance.HIGH,
    });

    await notifee.createChannel({
      id: CHANNELS.EXPENSE_CHANNEL_ID,
      name: i18n.t('Notifications.expense_channel'),
      importance: AndroidImportance.HIGH,
    });

    await notifee.createChannel({
      id: CHANNELS.FOOD_CHANNEL_ID,
      name: i18n.t('Notifications.food_channel'),
      importance: AndroidImportance.HIGH,
    });

    await notifee.createChannel({
      id: CHANNELS.HABITS_CHANNEL_ID,
      name: i18n.t('Notifications.habits_channel'),
      importance: AndroidImportance.HIGH,
    });

    await initDailyExpenseReminder();
    await initLunchReminder();
    await initDailyHabitsReminder();

    const unsubscribeForeground = notifee.onForegroundEvent(
      ({ type, detail }) => {
        if (type === EventType.PRESS) {
          navigateFromNotificationData(
            detail.notification?.data as Record<string, string> | undefined,
          );
        }
      },
    );

    const m = getMessaging();

    const unsubscribeMessaging = onMessage(m, async remoteMessage => {
      const notification = remoteMessage.notification;
      if (!notification?.title) return;

      await notifee.displayNotification({
        title: notification.title,
        body: notification.body,
        android: {
          channelId:
            (remoteMessage.data?.channel as string) ||
            CHANNELS.EXPENSE_CHANNEL_ID,
          importance: AndroidImportance.HIGH,
          pressAction: { id: 'default' },
        },
        data: remoteMessage.data as Record<string, string> | undefined,
      });
    });

    const unsubscribeOpenedApp = onNotificationOpenedApp(m, remoteMessage => {
      navigateFromNotificationData(
        remoteMessage.data as Record<string, string> | undefined,
      );
    });

    const initialNotification = await getInitialNotification(m);
    if (initialNotification) {
      navigateFromNotificationData(
        initialNotification.data as Record<string, string> | undefined,
      );
    }

    const unsubscribeTokenRefresh = onTokenRefresh(m, async newToken => {
      await saveTokenToServer(newToken);
    });

    return () => {
      unsubscribeForeground();
      unsubscribeMessaging();
      unsubscribeOpenedApp();
      unsubscribeTokenRefresh();
    };
  },
};
