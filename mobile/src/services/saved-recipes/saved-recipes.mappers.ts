import { Recipe } from '@/types/recipe';

import { SavedRecipeResponse } from './saved-recipes.types';

export const mapSavedRecipeToRecipe = (saved: SavedRecipeResponse): Recipe => ({
  id: saved.recipeId,
  title: saved.title,
  imageUrl: saved.imageUrl,
  category: saved.category,
  area: saved.area,
  tags: saved.tags,
  ingredients: saved.ingredients,
  instructions: saved.instructions,
  youtubeUrl: saved.youtubeUrl,
});
