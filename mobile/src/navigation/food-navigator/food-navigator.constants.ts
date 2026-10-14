import { MealsTab } from '@screens/food/components/meals-tab';
import { RecipesTab } from '@screens/food/components/recipes-tab';
import { WaterTab } from '@screens/food/components/water-tab';

import { FoodTabItem } from '@/navigation';

const t = (key: string) => key;

export const FOOD_TABS: FoodTabItem[] = [
  {
    name: 'Meals',
    component: MealsTab,
    options: { title: t('Food.tabs.meals') },
  },
  {
    name: 'Water',
    component: WaterTab,
    options: { title: t('Food.tabs.water') },
  },
  {
    name: 'Recipes',
    component: RecipesTab,
    options: { title: t('Food.tabs.recipes') },
  },
];
