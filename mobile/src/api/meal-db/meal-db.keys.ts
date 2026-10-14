export const mealdbKeys = {
  all: ['mealdb'] as const,
  search: (query: string) => [...mealdbKeys.all, 'search', query] as const,
  categories: () => [...mealdbKeys.all, 'categories'] as const,
  filterCategory: (category: string) =>
    [...mealdbKeys.all, 'filter', 'category', category] as const,
  filterArea: (area: string) =>
    [...mealdbKeys.all, 'filter', 'area', area] as const,
  detail: (id: string) => [...mealdbKeys.all, 'detail', id] as const,
};
