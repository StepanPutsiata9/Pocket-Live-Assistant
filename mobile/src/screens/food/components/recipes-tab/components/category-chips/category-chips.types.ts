export interface CategoryChipsProps {
  categories: string[];
  activeCategory: string | null;
  onSelect: (category: string) => void;
  isSavedActive: boolean;
  onSelectSaved: () => void;
  savedLabel: string;
}
