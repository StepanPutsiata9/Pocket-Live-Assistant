import { type App, cert, getApps, initializeApp } from 'firebase-admin/app';
import { type Auth, getAuth } from 'firebase-admin/auth';

import env from './env.ts';

type ServiceAccountJson = {
  project_id: string;
  client_email: string;
  private_key: string;
};

let app: App | undefined;

export const initFirebase = (): App => {
  if (app) return app;

  const existing = getApps()[0];
  if (existing) {
    app = existing;
    return app;
  }

  const parsed = JSON.parse(
    Buffer.from(env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf8'),
  ) as ServiceAccountJson;

  app = initializeApp({
    credential: cert({
      projectId: parsed.project_id,
      clientEmail: parsed.client_email,
      privateKey: parsed.private_key,
    }),
    projectId: parsed.project_id,
  });

  return app;
};

export const firebaseAuth = (): Auth => getAuth(initFirebase());
