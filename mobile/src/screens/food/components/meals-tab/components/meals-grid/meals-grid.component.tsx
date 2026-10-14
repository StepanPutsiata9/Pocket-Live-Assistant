import { MEAL_CATEGORIES } from '@screens/food/components/meals-tab';
import { MealType } from '@store/food';
import Animated, { LinearTransition } from 'react-native-reanimated';

import { MealsGridItem } from './components/meals-grid-item';
import { useMealsGrid } from './meals-grid.hook';
import { styles } from './meals-grid.styles';

export const MealsGrid = () => {
  const { mealCalories } = useMealsGrid();

  return (
    <Animated.View style={styles.mealsGridContainer} layout={LinearTransition}>
      {MEAL_CATEGORIES.map(category => {
        const totalKcal = mealCalories[category.id as MealType] || 0;
        return (
          <MealsGridItem
            category={category}
            totalCalories={totalKcal}
            key={category.id}
          />
        );
      })}
    </Animated.View>
  );
};
