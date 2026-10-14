import type { Recipe } from '@/types/recipe';

import { mealdbClient } from './meal-db.client';
import { mapRawMealToRecipe } from './meal-db.mappers';
import type { CategoriesResponse, MealsResponse } from './meal-db.types';

export const searchRecipesByName = async (
  query: string,
  signal?: AbortSignal,
): Promise<Recipe[]> => {
  const { data } = await mealdbClient.get<MealsResponse>('/search.php', {
    params: { s: query },
    signal,
  });

  return (data.meals ?? []).map(mapRawMealToRecipe);
};

export const filterByCategory = async (
  category: string,
  signal?: AbortSignal,
): Promise<Recipe[]> => {
  const { data } = await mealdbClient.get<MealsResponse>('/filter.php', {
    params: { c: category },
    signal,
  });

  return (data.meals ?? []).map(mapRawMealToRecipe);
};

export const filterByArea = async (
  area: string,
  signal?: AbortSignal,
): Promise<Recipe[]> => {
  const { data } = await mealdbClient.get<MealsResponse>('/filter.php', {
    params: { a: area },
    signal,
  });

  return (data.meals ?? []).map(mapRawMealToRecipe);
};

export const getCategories = async (
  signal?: AbortSignal,
): Promise<string[]> => {
  const { data } = await mealdbClient.get<CategoriesResponse>(
    '/categories.php',
    { signal },
  );

  return data.categories.map(category => category.strCategory);
};

export const getRecipeById = async (
  id: string,
  signal?: AbortSignal,
): Promise<Recipe | null> => {
  const { data } = await mealdbClient.get<MealsResponse>('/lookup.php', {
    params: { i: id },
    signal,
  });
  const meal = data.meals?.[0];

  return meal ? mapRawMealToRecipe(meal) : null;
};
