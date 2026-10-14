import apiClient from '@/api/api-client';
import { Recipe } from '@/types/recipe';

import { mapSavedRecipeToRecipe } from './saved-recipes.mappers';
import { SavedRecipeResponse } from './saved-recipes.types';

export const createSavedRecipe = async (recipe: Recipe): Promise<Recipe> => {
  const { data } = await apiClient.post('/saved-recipes', recipe);
  const savedRecipe = data.savedRecipe as SavedRecipeResponse;

  return mapSavedRecipeToRecipe(savedRecipe);
};
