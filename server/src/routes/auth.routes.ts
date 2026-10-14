import type { Response } from 'express';
import { Router } from 'express';

import { AppError } from '../errors/AppError.ts';
import type { AuthenticatedRequest } from '../middleware/auth.middleware.ts';
import { verifyFirebaseToken } from '../middleware/auth.middleware.ts';
import { User } from '../models/User.ts';

const router = Router();

router.get(
  '/sync',
  verifyFirebaseToken,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { uid, email } = req.user!;

      let user = await User.findOne({ firebaseUid: uid });

      if (!user) {
        user = new User({
          firebaseUid: uid,
          email: email,
        });
        await user.save();
      }

      return res.json({ success: true, user });
    } catch {
      return res.status(500).json({
        success: false,
        code: 'SERVER_SYNC_ERROR',
        message: 'Internal server error during user synchronization',
      });
    }
  },
);
router.post(
  '/push-token',
  verifyFirebaseToken,
  async (req: AuthenticatedRequest, res: Response, next) => {
    try {
      const { token, language } = req.body;
      if (!token) return next(new AppError('Push token is required', 400));

      const update: Record<string, unknown> = {
        $addToSet: { pushTokens: token },
      };
      if (language === 'en' || language === 'ru') {
        update.$set = { language };
      }

      const user = await User.findOneAndUpdate(
        { firebaseUid: req.user!.uid },
        update,
        { new: true },
      );

      if (!user) return next(new AppError('User not found', 404));

      res.status(200).json({
        status: 'success',
        message: 'Push token successfully registered',
        data: true,
      });
    } catch (error) {
      next(error);
    }
  },
);
router.post(
  '/logout',
  verifyFirebaseToken,
  async (req: AuthenticatedRequest, res: Response, next) => {
    try {
      const { token } = req.body;
      if (!token)
        return next(new AppError('Push token is required to logout', 400));
      const user = await User.findOneAndUpdate(
        { firebaseUid: req.user!.uid },
        { $pull: { pushTokens: token } },
        { new: true },
      );

      if (!user) return next(new AppError('User not found', 404));

      res.status(200).json({
        status: 'success',
        message: 'Logged out successfully and push token removed',
        data: true,
      });
    } catch (error) {
      next(error);
    }
  },
);
export default router;
