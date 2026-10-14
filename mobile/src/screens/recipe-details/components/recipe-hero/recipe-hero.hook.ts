import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

import {
  useRemoveSavedRecipe,
  useSavedRecipes,
  useSaveRecipe,
} from '@/store/saved-recipes';

import { UseRecipeHeroParams } from './recipe-hero.types';

export const useRecipeHero = ({ recipe }: UseRecipeHeroParams) => {
  const navigation = useNavigation();
  const [hasError, setHasError] = useState(false);

  const { data: savedRecipes = [] } = useSavedRecipes();

  const { mutate: saveRecipe, isPending: isSaving } = useSaveRecipe();
  const { mutate: removeSavedRecipe, isPending: isRemoving } =
    useRemoveSavedRecipe();

  const isFavorite = savedRecipes.some(saved => saved.id === recipe.id);

  const isToggling = isSaving || isRemoving;

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleImageError = () => {
    setHasError(true);
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeSavedRecipe(recipe.id);
    } else {
      saveRecipe(recipe);
    }
  };

  return {
    hasError,
    isFavorite,
    isToggling,
    handleGoBack,
    handleImageError,
    handleToggleFavorite,
  };
};
