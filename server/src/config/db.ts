import mongoose from 'mongoose';

import env from './env.ts';
import logger from './logger.ts';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI);
    logger.info({ host: conn.connection.host }, 'MongoDB connected');
  } catch (error) {
    logger.error({ err: error }, 'MongoDB connection failed');
    process.exit(1);
  }
};

export default connectDB;
