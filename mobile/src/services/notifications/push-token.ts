import { getMessaging, getToken } from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

import api from '@/api/api-client';
import { useLanguageStore } from '@/store/settings';

export async function saveTokenToServer(passedToken?: string) {
  const m = getMessaging();
  if (Platform.OS === 'ios') {
    await m.registerDeviceForRemoteMessages();
  }

  const token = passedToken || (await getToken(m));
  if (!token) return;

  const language = useLanguageStore.getState().language;
  await api.post('/auth/push-token', { token, language });
}
