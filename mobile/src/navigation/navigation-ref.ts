import { createNavigationContainerRef } from '@react-navigation/native';

import { RootStackParamList, RootTabParamList } from './app-navigator.types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

const CHANNEL_TO_TAB: Record<string, keyof RootTabParamList> = {
  food_reminders_channel: 'Food',
  expense_reminders_channel: 'Finance',
  schedule_reminders_channel: 'Schedule',
};

export function navigateFromNotificationData(data?: Record<string, string>) {
  if (!navigationRef.isReady() || !data?.channel) return;

  const tab = CHANNEL_TO_TAB[data.channel];
  if (tab) {
    navigationRef.navigate('Tabs', { screen: tab });
  }
}
