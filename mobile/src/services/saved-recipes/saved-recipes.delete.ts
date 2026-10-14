import apiClient from '@/api/api-client';

export const deleteSavedRecipeApi = async (recipeId: string) => {
  const { data } = await apiClient.delete(`/saved-recipes/${recipeId}`);

  return data.result;
};
