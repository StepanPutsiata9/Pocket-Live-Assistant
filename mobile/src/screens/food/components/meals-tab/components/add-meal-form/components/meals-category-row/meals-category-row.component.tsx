import { MEAL_CATEGORIES } from '@screens/food/components/meals-tab';
import { MealType } from '@store/food';
import { TouchableOpacity, View } from 'react-native';

import { Text } from '@/components/ui/text';
import { useActiveTranslation } from '@/hooks';

import { styles } from './meals-category-row.styles';
import { MealsCategoryRowProps } from './meals-category-row.types';

export const MealsCategoryRowComponent = (props: MealsCategoryRowProps) => {
  const { mealType, setMealType } = props;
  const { t } = useActiveTranslation();

  return (
    <View style={styles.categoryRow}>
      {MEAL_CATEGORIES.map(category => {
        const isSelected = mealType === category.id;
        return (
          <TouchableOpacity
            key={category.id}
            onPress={() => setMealType(category.id as MealType)}
            style={[styles.categoryBtn, isSelected && styles.categoryBtnActive]}
          >
            <Text
              variant="caption"
              colorType="secondary"
              style={isSelected && styles.categoryTextActive}
            >
              {t(category.translationKey)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
