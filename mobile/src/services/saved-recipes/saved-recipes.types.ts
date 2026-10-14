import { Recipe } from '@/types/recipe';

export interface SavedRecipeResponse extends Recipe {
  recipeId: string;
}
