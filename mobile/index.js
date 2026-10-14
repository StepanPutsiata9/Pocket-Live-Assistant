import 'react-native-gesture-handler';

import {
  getMessaging,
  setBackgroundMessageHandler,
} from '@react-native-firebase/messaging';
import { AppRegistry } from 'react-native';
import notifee, { AndroidImportance } from 'react-native-notify-kit';

import i18n from '@/i18n';

import App from './App';
import { name as appName } from './app.json';

notifee.onBackgroundEvent(async () => {});

setBackgroundMessageHandler(getMessaging(), async remoteMessage => {
  if (remoteMessage.notification) return;

  const title = remoteMessage.data?.title;
  const body = remoteMessage.data?.body;

  if (title) {
    await notifee.displayNotification({
      title: i18n.t(`Notifications.${title}`),
      body: i18n.t(`Notifications.${body}`),
      android: {
        channelId: remoteMessage.data?.channel || 'expense_reminders_channel',
        importance: AndroidImportance.HIGH,
        pressAction: { id: 'default' },
      },
    });
  }
});

AppRegistry.registerComponent(appName, () => App);
