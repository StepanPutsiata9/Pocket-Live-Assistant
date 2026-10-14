import { useEffect, useState } from 'react';

import { DEFAULT_CATEGORY } from '@/api/meal-db';

import type {
  RecipeFilter,
  RecipeFilterType,
} from './recipe-filter-modal.types';

const DEFAULT_FILTER: RecipeFilter = {
  type: 'category',
  value: DEFAULT_CATEGORY,
};

export const useRecipesFilter = (
  visible: boolean,
  activeFilter: RecipeFilter,
  onApply: (filter: RecipeFilter) => void,
) => {
  const [draft, setDraft] = useState<RecipeFilter>(activeFilter);

  useEffect(() => {
    if (visible) {
      setDraft(activeFilter);
    }
  }, [visible, activeFilter]);

  const isSelected = (type: RecipeFilterType, value: string) =>
    draft.type === type && draft.value === value;

  const selectFilter = (type: RecipeFilterType, value: string) =>
    setDraft({ type, value });

  const resetFilter = () => setDraft(DEFAULT_FILTER);

  const applyFilter = () => onApply(draft);

  return {
    isSelected,
    selectFilter,
    resetFilter,
    applyFilter,
  };
};
