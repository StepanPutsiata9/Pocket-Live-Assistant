import apiClient from '@/api/api-client';
import { Recipe } from '@/types/recipe';

import { mapSavedRecipeToRecipe } from './saved-recipes.mappers';
import { SavedRecipeResponse } from './saved-recipes.types';

export const getSavedRecipes = async (): Promise<Recipe[]> => {
  const { data } = await apiClient.get('/saved-recipes');
  const savedRecipes = data.savedRecipes as SavedRecipeResponse[];

  return savedRecipes.map(mapSavedRecipeToRecipe);
};
