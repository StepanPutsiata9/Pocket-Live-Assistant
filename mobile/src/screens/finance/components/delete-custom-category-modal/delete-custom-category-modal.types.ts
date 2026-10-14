export interface DeleteCustomCategoryModalProps {
  visible: boolean;
  customCategories: { id: string; name: string }[];
  onDelete: (id: string) => void;
  onClose: () => void;
}
