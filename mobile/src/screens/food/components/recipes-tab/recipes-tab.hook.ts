import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

import {
  DEFAULT_CATEGORY,
  filterByArea,
  filterByCategory,
  getCategories,
  MEALDB_AREAS,
  mealdbKeys,
  searchRecipesByName,
} from '@/api/meal-db';
import { useActiveTranslation } from '@/hooks';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import type { RootStackParamList } from '@/navigation/app-navigator.types';
import { useSavedRecipes } from '@/store/saved-recipes';

import type { RecipeFilter } from './components/recipes-filter-modal';

const DEBOUNCE_MS = 400;

const DEFAULT_FILTER: RecipeFilter = {
  type: 'category',
  value: DEFAULT_CATEGORY,
};

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export const useRecipesTab = () => {
  const { t } = useActiveTranslation();
  const navigation = useNavigation<Navigation>();

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<RecipeFilter>(DEFAULT_FILTER);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [isManualRefreshing, setIsManualRefreshing] = useState(false);

  const debouncedQuery = useDebouncedValue(query.trim(), DEBOUNCE_MS);
  const isSearching = debouncedQuery.length > 0;
  const isAreaFilter = filter.type === 'area';

  const savedRecipesQuery = useSavedRecipes();

  const categoriesQuery = useQuery({
    queryKey: mealdbKeys.categories(),
    queryFn: ({ signal }) => getCategories(signal),
  });

  const recipesQuery = useQuery({
    queryKey: isSearching
      ? mealdbKeys.search(debouncedQuery)
      : isAreaFilter
        ? mealdbKeys.filterArea(filter.value)
        : mealdbKeys.filterCategory(filter.value),
    queryFn: ({ signal }) =>
      isSearching
        ? searchRecipesByName(debouncedQuery, signal)
        : isAreaFilter
          ? filterByArea(filter.value, signal)
          : filterByCategory(filter.value, signal),
  });

  const isSavedActive = showSaved && !isSearching;

  const onSelectCategory = (category: string) => {
    setQuery('');
    setShowSaved(false);
    setFilter({ type: 'category', value: category });
  };

  const onSelectSaved = () => {
    setQuery('');
    setShowSaved(true);
  };

  const onApplyFilter = (nextFilter: RecipeFilter) => {
    setQuery('');
    setShowSaved(false);
    setFilter(nextFilter);
    setIsFilterOpen(false);
  };

  const openRecipe = useCallback(
    (recipeId: string) => {
      navigation.navigate('RecipeDetails', { recipeId });
    },
    [navigation],
  );

  const refetch = () => {
    setIsManualRefreshing(true);
    try {
      if (isSavedActive) {
        savedRecipesQuery.refetch();
      } else {
        recipesQuery.refetch();
      }
    } finally {
      setIsManualRefreshing(false);
    }
  };

  return {
    t,
    query,
    setQuery,
    categories: categoriesQuery.data ?? [],
    areas: MEALDB_AREAS,
    activeCategory:
      isSavedActive || isSearching || isAreaFilter ? null : filter.value,
    activeFilter: filter,
    isSavedActive,
    onSelectCategory,
    onSelectSaved,
    isFilterOpen,
    openFilter: () => setIsFilterOpen(true),
    closeFilter: () => setIsFilterOpen(false),
    onApplyFilter,
    recipes: isSavedActive
      ? (savedRecipesQuery.data ?? [])
      : (recipesQuery.data ?? []),
    isLoading: isSavedActive
      ? savedRecipesQuery.isLoading
      : recipesQuery.isLoading,
    isFetching: isManualRefreshing,
    isError: isSavedActive ? savedRecipesQuery.isError : recipesQuery.isError,
    refetch,
    openRecipe,
  };
};
