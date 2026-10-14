import type { NextFunction, Response } from 'express';

import { AppError } from '../errors/AppError.ts';
import type { AuthenticatedRequest } from '../middleware/auth.middleware.ts';
import * as taskService from '../services/task.service.ts';

export const getTasks = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tasks = await taskService.listTasks(req.user!.uid);
    res.status(200).json({ status: 'success', tasks });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newTask = await taskService.createTask(req.user!.uid, req.body);
    res.status(201).json({ status: 'success', newTask });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    if (typeof id !== 'string') {
      return next(new AppError('id is required', 400));
    }

    const task = await taskService.updateTask(req.user!.uid, id, req.body);
    res.status(200).json({ status: 'success', task });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    if (typeof id !== 'string') {
      return next(new AppError('id is required', 400));
    }

    await taskService.deleteTask(req.user!.uid, id);
    res.status(200).json({
      status: 'success',
      message: 'Task successfully deleted',
      result: true,
    });
  } catch (error) {
    next(error);
  }
};

export const clearCompletedTasks = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    await taskService.clearCompletedTasks(req.user!.uid);
    res.status(200).json({
      status: 'success',
      message: 'Completed tasks cleared',
      result: true,
    });
  } catch (error) {
    next(error);
  }
};

export const getTasksChanges = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const since = req.query.since as string | undefined;
    const changes = await taskService.getTasksChanges(req.user!.uid, since);
    res.status(200).json({ status: 'success', changes });
  } catch (error) {
    next(error);
  }
};

export const pushTasks = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { tasks } = req.body;
    if (!Array.isArray(tasks)) {
      return next(new AppError('tasks must be an array', 400));
    }
    await taskService.pushTasks(req.user!.uid, tasks);
    res.status(200).json({ status: 'success' });
  } catch (error) {
    next(error);
  }
};
