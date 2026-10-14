import type { Ingredient, Recipe } from '@/types/recipe';

import { MEALDB_INGREDIENT_COUNT } from './meal-db.constants';
import type { RawMeal } from './meal-db.types';

const extractIngredients = (raw: RawMeal): Ingredient[] => {
  const result: Ingredient[] = [];

  for (let i = 1; i <= MEALDB_INGREDIENT_COUNT; i++) {
    const name = raw[`strIngredient${i}`]?.trim();
    const measure = raw[`strMeasure${i}`]?.trim() ?? '';

    if (name) {
      result.push({ name, measure });
    }
  }

  return result;
};

export const mapRawMealToRecipe = (raw: RawMeal): Recipe => ({
  id: raw.idMeal,
  title: raw.strMeal,
  imageUrl: raw.strMealThumb,
  category: raw.strCategory ?? undefined,
  area: raw.strArea ?? undefined,
  tags: raw.strTags
    ? raw.strTags
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean)
    : [],
  instructions: raw.strInstructions ?? undefined,
  ingredients: extractIngredients(raw),
  youtubeUrl: raw.strYoutube || undefined,
});
