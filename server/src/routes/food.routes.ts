import { type Response, Router } from 'express';

import { AppError } from '../errors/AppError.ts';
import {
  type AuthenticatedRequest,
  verifyFirebaseToken,
} from '../middleware/auth.middleware.ts';
import { DailyLog } from '../models/DailyLog.ts';
import { User } from '../models/User.ts';
import { pushService } from '../services/PushService.ts';

const router = Router();

router.use(verifyFirebaseToken);

router.get('/', async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user!.uid });
    if (!user) return next(new AppError('User not found', 404));

    const { date } = req.query;
    if (!date || typeof date !== 'string') {
      return next(new AppError('Date is required', 400));
    }

    let log = await DailyLog.findOne({ date, userId: user._id });
    if (!log) {
      log = new DailyLog({ date, userId: user._id, water: 0, food: [] });
    }

    res.status(200).json({
      status: 'success',
      log,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user!.uid });
    if (!user) return next(new AppError('User not found', 404));

    const { date, type, name, calories, protein, fats, carbs } = req.body;
    if (!date) return next(new AppError('Date is required', 400));

    let log = await DailyLog.findOne({ date, userId: user._id });
    if (!log) {
      log = new DailyLog({ date, userId: user._id, water: 0, food: [] });
    }

    log.food.push({
      name,
      type,
      calories: Number(calories || 0),
      protein: Number(protein || 0),
      fats: Number(fats || 0),
      carbs: Number(carbs || 0),
    });

    await log.save();

    try {
      if (user.pushTokens && user.pushTokens.length > 0) {
        const totalCalories = log.food.reduce(
          (sum, item) => sum + (item.calories || 0),
          0,
        );

        if (totalCalories > 2000) {
          await pushService.sendPushToUserDevices(
            user,
            'foodLimitExceeded',
            'foodLimitWarning',
            'food_reminders_channel',
            { channel: 'food_reminders_channel' },
          );
        }
      }
    } catch (pushError) {
      console.error('Push notification error (food saved):', pushError);
    }

    res.status(201).json({
      status: 'success',
      log,
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  '/water',
  async (req: AuthenticatedRequest, res: Response, next) => {
    try {
      const user = await User.findOne({ firebaseUid: req.user!.uid });
      if (!user) return next(new AppError('User not found', 404));

      const { date, amount } = req.body;
      if (!date) return next(new AppError('Date is required', 400));

      let log = await DailyLog.findOne({ date, userId: user._id });
      if (!log) {
        log = new DailyLog({ date, userId: user._id, water: 0, food: [] });
      }

      log.water = Math.max(0, log.water + Number(amount));
      await log.save();

      res.status(200).json({
        status: 'success',
        log,
      });
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/clear',
  async (req: AuthenticatedRequest, res: Response, next) => {
    try {
      const user = await User.findOne({ firebaseUid: req.user!.uid });
      if (!user) return next(new AppError('User not found', 404));

      const { date } = req.body;
      if (!date) return next(new AppError('Date is required', 400));

      const log = await DailyLog.findOne({ date, userId: user._id });
      if (log) {
        log.food = [];
        await log.save();
      }

      res.status(200).json({
        status: 'success',
        message: 'FOOD_HISTORY_CLEARED',
        log,
      });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
