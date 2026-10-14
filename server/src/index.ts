import dns from 'node:dns';

import mongoose from 'mongoose';

import app from './app.ts';
import connectDB from './config/db.ts';
import env from './config/env.ts';
import { initFirebase } from './config/firebase.ts';
import logger from './config/logger.ts';

dns.setServers(['1.1.1.1', '8.8.8.8']);

const startServer = async () => {
  try {
    initFirebase();
    logger.info('Firebase Admin SDK successfully initialized');

    await connectDB();
    const server = app.listen(env.PORT, () => {
      logger.info({ port: env.PORT, env: env.NODE_ENV }, 'Server started');
    });

    const shutdown = async (signal: string) => {
      logger.info(`${signal} received, shutting down...`);
      server.close(async () => {
        await mongoose.connection.close();
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    logger.error({ err: error }, 'Failed to start server');
    process.exit(1);
  }
};

startServer();
