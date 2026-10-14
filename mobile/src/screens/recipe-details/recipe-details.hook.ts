import { useQuery } from '@tanstack/react-query';
import { Linking } from 'react-native';
import Toast from 'react-native-toast-message';

import { getRecipeById, mealdbKeys } from '@/api/meal-db';
import { useActiveTranslation } from '@/hooks';
import {
  useRemoveSavedRecipe,
  useSavedRecipes,
  useSaveRecipe,
} from '@/store/saved-recipes';

export const useRecipeDetails = (recipeId: string) => {
  const { t } = useActiveTranslation();
  const { data: savedRecipes = [] } = useSavedRecipes();
  const { mutate: saveRecipe } = useSaveRecipe();
  const { mutate: removeSavedRecipe } = useRemoveSavedRecipe();

  const {
    data: recipe = null,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: mealdbKeys.detail(recipeId),
    queryFn: ({ signal }) => getRecipeById(recipeId, signal),
  });

  const isSaved = savedRecipes.some(item => item.id === recipeId);
  const toggleSaveRecipe = () => {
    if (!recipe) return;

    if (isSaved) {
      removeSavedRecipe(recipeId);
    } else {
      saveRecipe(recipe);
    }
  };

  const handleWatchVideo = async () => {
    const youtubeUrl = recipe?.youtubeUrl;
    if (!youtubeUrl) return;

    try {
      await Linking.openURL(youtubeUrl);
    } catch {
      Toast.show({
        type: 'error',
        text1: t('Food.recipes.details.videoErrorTitle'),
        text2: t('Food.recipes.details.videoErrorMessage'),
        position: 'top',
        visibilityTime: 4000,
      });
    }
  };

  return {
    recipe,
    isLoading,
    isError,
    refetch,
    isSaved,
    toggleSaveRecipe,
    handleWatchVideo,
  };
};
