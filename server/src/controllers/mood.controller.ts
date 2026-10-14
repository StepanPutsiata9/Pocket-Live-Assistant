import type { NextFunction, Response } from 'express';

import { AppError } from '../errors/AppError.ts';
import type { AuthenticatedRequest } from '../middleware/auth.middleware.ts';
import { Mood } from '../models/Mood.ts';
import { User } from '../models/User.ts';

export const getMoods = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user!.uid });
    if (!user) return next(new AppError('User not found', 404));

    const moods = await Mood.find({ userId: user._id }).sort({ date: -1 });
    res.status(200).json({ status: 'success', moods });
  } catch (error) {
    next(error);
  }
};

export const upsertMood = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user!.uid });
    if (!user) return next(new AppError('User not found', 404));

    const { date, moodIndex } = req.body;

    const mood = await Mood.findOneAndUpdate(
      { userId: user._id, date },
      { moodIndex },
      { upsert: true, new: true },
    );

    res.status(200).json({ status: 'success', mood });
  } catch (error) {
    next(error);
  }
};

export const deleteMood = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user!.uid });
    if (!user) return next(new AppError('User not found', 404));

    const mood = await Mood.findOneAndDelete({
      _id: req.params.id,
      userId: user._id,
    });

    if (!mood) return next(new AppError('Mood not found or unauthorized', 404));

    res.status(200).json({ status: 'success', result: true });
  } catch (error) {
    next(error);
  }
};
