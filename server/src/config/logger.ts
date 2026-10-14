import pino from 'pino';

import env from './env.ts';

const logger = pino({
  level: env.NODE_ENV === 'development' ? 'debug' : 'info',
  transport:
    env.NODE_ENV === 'development'
      ? { target: 'pino-pretty', options: { colorize: true } }
      : undefined,
  redact: ['req.headers.authorization', 'password', 'token'],
});

export default logger;
