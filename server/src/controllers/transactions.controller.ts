import { type NextFunction, type Response, Router } from 'express';

import { AppError } from '../errors/AppError.ts';
import {
  type AuthenticatedRequest,
  verifyFirebaseToken,
} from '../middleware/auth.middleware.ts';
import { Transaction } from '../models/Transaction.ts';
import { User } from '../models/User.ts';
import { pushService } from '../services/PushService.ts';

const router = Router();

router.use(verifyFirebaseToken);

export const getTransactions = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user!.uid });
    if (!user) return next(new AppError('User not found', 404));

    const transactions = await Transaction.find({ userId: user._id }).sort({
      date: -1,
    });
    res.status(200).json({
      status: 'success',
      transactions,
    });
  } catch (error) {
    next(error);
  }
};

export const addTransaction = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user!.uid });
    if (!user) return next(new AppError('User not found', 404));

    const { type, description, amount, category, date, currency } = req.body;

    const newTransaction = new Transaction({
      userId: user._id,
      type,
      description,
      amount,
      category,
      date: date ? new Date(date) : new Date(),
      currency,
    });

    await newTransaction.save();

    if (type === 'expense' && user.pushTokens && user.pushTokens.length > 0) {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const aggregateResult = await Transaction.aggregate([
        {
          $match: {
            userId: user._id,
            type: 'expense',
            category: category,
            date: { $gte: startOfMonth },
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: '$amount' },
          },
        },
      ]);

      const currentMonthTotal = aggregateResult[0]?.totalAmount || 0;
      const CATEGORY_LIMIT = 50000;

      if (currentMonthTotal > CATEGORY_LIMIT) {
        const pushTitle = 'limitExceeding';
        const pushBody = 'limitWarning';

        pushService.sendPushToUserDevices(
          user,
          pushTitle,
          pushBody,
          'expense_reminders_channel',
          {
            channel: 'expense_reminders_channel',
          },
        );
      }
    }

    res.status(201).json({
      status: 'success',
      newTransaction,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTransaction = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user!.uid });
    if (!user) return next(new AppError('User not found', 404));
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: user._id,
    });

    if (!transaction) {
      return next(new AppError('Transaction not found or unauthorized', 404));
    }

    res.status(200).json({
      status: 'success',
      message: 'Transaction successfully deleted',
      result: true,
    });
  } catch (error) {
    next(error);
  }
};

export default router;
