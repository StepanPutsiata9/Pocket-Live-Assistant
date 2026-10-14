import type { NextFunction, Response } from 'express';

import { AppError } from '../errors/AppError.ts';
import type { AuthenticatedRequest } from '../middleware/auth.middleware.ts';
import * as savedRecipeService from '../services/savedRecipe.service.ts';

export const getSavedRecipes = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const savedRecipes = await savedRecipeService.listSavedRecipes(
      req.user!.uid,
    );
    res.status(200).json({ status: 'success', savedRecipes });
  } catch (error) {
    next(error);
  }
};

export const createSavedRecipe = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const savedRecipe = await savedRecipeService.saveRecipe(
      req.user!.uid,
      req.body,
    );
    res.status(201).json({ status: 'success', savedRecipe });
  } catch (error) {
    next(error);
  }
};

export const deleteSavedRecipe = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { recipeId } = req.params;
    if (typeof recipeId !== 'string') {
      return next(new AppError('recipeId is required', 400));
    }

    await savedRecipeService.removeSavedRecipe(req.user!.uid, recipeId);
    res.status(200).json({
      status: 'success',
      message: 'Recipe removed from saved list',
      result: true,
    });
  } catch (error) {
    next(error);
  }
};
