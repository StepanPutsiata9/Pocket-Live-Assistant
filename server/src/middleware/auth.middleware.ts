import type { NextFunction, Request, Response } from 'express';
import type { DecodedIdToken } from 'firebase-admin/auth';

import { firebaseAuth } from '../config/firebase.ts';
import logger from '../config/logger.ts';

export interface AuthenticatedRequest extends Request {
  user?: DecodedIdToken;
}

export const verifyFirebaseToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        code: 'AUTH_TOKEN_MISSING',
        message: 'Access denied. Token is missing.',
      });
    }

    const token = authHeader.split(' ')[1] ?? '';

    const decodedToken = await firebaseAuth().verifyIdToken(token);

    req.user = decodedToken;
    next();
  } catch (error) {
    logger.error({ err: error }, 'Firebase token validation failed');

    return res.status(401).json({
      success: false,
      code: 'AUTH_TOKEN_INVALID',
      message: 'Session has expired or is invalid. Please log in again.',
    });
  }
};
