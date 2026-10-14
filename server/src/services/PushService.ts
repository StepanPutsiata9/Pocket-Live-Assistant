import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';

import { type IUser, User } from '../models/User.ts';
import { type Lang, localizeNotification } from './notificationLocales.ts';

const b64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
if (!b64) {
  throw new Error('FIREBASE_SERVICE_ACCOUNT_BASE64 is not set in .env');
}
const jsonText = Buffer.from(b64, 'base64').toString('utf8');
const serviceAccount = JSON.parse(jsonText);

if (getApps().length === 0) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const DEAD_TOKEN_CODES = [
  'messaging/registration-token-not-registered',
  'messaging/invalid-registration-token',
];

export const pushService = {
  sendPushToUserDevices: async (
    user: IUser,
    titleKey: string,
    bodyKey: string,
    channelId: string,
    data?: Record<string, string>,
  ) => {
    const tokens = user.pushTokens ?? [];
    if (tokens.length === 0) {
      return;
    }

    const lang: Lang = user.language === 'ru' ? 'ru' : 'en';
    const title = localizeNotification(titleKey, lang);
    const body = localizeNotification(bodyKey, lang);

    const message = {
      tokens,
      notification: { title, body },
      data: { ...(data || {}), channel: channelId },
      android: {
        priority: 'high' as const,
        notification: { channelId },
      },
      apns: {
        headers: { 'apns-priority': '10' },
        payload: { aps: { sound: 'default' } },
      },
    };

    const response = await getMessaging().sendEachForMulticast(message);

    if (response.failureCount > 0) {
      const deadTokens: string[] = [];
      response.responses.forEach((resp, idx) => {
        const code = resp.error?.code;
        const token = tokens[idx];
        if (token && code && DEAD_TOKEN_CODES.includes(code)) {
          deadTokens.push(token);
        }
      });

      if (deadTokens.length > 0) {
        await User.updateOne(
          { _id: user._id },
          { $pull: { pushTokens: { $in: deadTokens } } },
        );
      }
    }
  },
};
