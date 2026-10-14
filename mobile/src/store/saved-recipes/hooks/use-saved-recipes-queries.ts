import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import i18n from '@/i18n';
import {
  createSavedRecipe,
  deleteSavedRecipeApi,
  getSavedRecipes,
} from '@/services';
import { Recipe } from '@/types/recipe';

export const SAVED_RECIPES_KEYS = {
  all: ['saved-recipes'] as const,
};

const notifyError = () => {
  Toast.show({
    type: 'error',
    text1: i18n.t('Food.recipes.saved.error'),
    text2: i18n.t('Food.recipes.saved.tryLater'),
    position: 'top',
    visibilityTime: 4000,
  });
};

export const useSavedRecipes = () => {
  return useQuery<Recipe[]>({
    queryKey: SAVED_RECIPES_KEYS.all,
    queryFn: getSavedRecipes,
    staleTime: 1000 * 60 * 10,
  });
};

export const useSaveRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recipe: Recipe) => createSavedRecipe(recipe),

    onMutate: async newRecipe => {
      await queryClient.cancelQueries({ queryKey: SAVED_RECIPES_KEYS.all });

      const previousRecipes =
        queryClient.getQueryData<Recipe[]>(SAVED_RECIPES_KEYS.all) ?? [];

      const alreadySaved = previousRecipes.some(
        item => item.id === newRecipe.id,
      );

      if (!alreadySaved) {
        queryClient.setQueryData<Recipe[]>(SAVED_RECIPES_KEYS.all, [
          newRecipe,
          ...previousRecipes,
        ]);
      }

      return { previousRecipes };
    },

    onError: (_err, _newRecipe, context) => {
      if (context?.previousRecipes) {
        queryClient.setQueryData(
          SAVED_RECIPES_KEYS.all,
          context.previousRecipes,
        );
      }
      notifyError();
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: SAVED_RECIPES_KEYS.all });
    },
  });
};

export const useRemoveSavedRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recipeId: string) => deleteSavedRecipeApi(recipeId),

    onMutate: async recipeId => {
      await queryClient.cancelQueries({ queryKey: SAVED_RECIPES_KEYS.all });

      const previousRecipes =
        queryClient.getQueryData<Recipe[]>(SAVED_RECIPES_KEYS.all) ?? [];

      queryClient.setQueryData<Recipe[]>(
        SAVED_RECIPES_KEYS.all,
        previousRecipes.filter(item => item.id !== recipeId),
      );

      return { previousRecipes };
    },

    onError: (_err, _recipeId, context) => {
      if (context?.previousRecipes) {
        queryClient.setQueryData(
          SAVED_RECIPES_KEYS.all,
          context.previousRecipes,
        );
      }
      notifyError();
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: SAVED_RECIPES_KEYS.all });
    },
  });
};
