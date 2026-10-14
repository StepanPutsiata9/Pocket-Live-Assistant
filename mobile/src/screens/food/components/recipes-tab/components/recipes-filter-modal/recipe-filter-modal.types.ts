export type RecipeFilterType = 'category' | 'area';

export interface RecipeFilter {
  type: RecipeFilterType;
  value: string;
}

export interface RecipesFilterModalProps {
  visible: boolean;
  onClose: () => void;
  categories: string[];
  areas: string[];
  activeFilter: RecipeFilter;
  onApply: (filter: RecipeFilter) => void;
}
