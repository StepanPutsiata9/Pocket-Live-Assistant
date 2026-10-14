import { memo } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Text } from '@/components/ui/text';
import { useActiveTranslation } from '@/hooks';

import { styles } from './meals-grid-item.styles';
import { MealGridItemProps } from './meals-grid-item.types';

const MealsGridItemComponent = (props: MealGridItemProps) => {
  const { category, totalCalories } = props;

  const { t } = useActiveTranslation();

  return (
    <View key={category.id} style={styles.gridCard}>
      <Icon name={category.icon} style={styles.gridIcon} />
      <View style={styles.gridTextContainer}>
        <Text variant="h2" colorType="main">
          {totalCalories}
        </Text>
        <Text variant="caption" colorType="main">
          {t(category.translationKey)}
        </Text>
      </View>
    </View>
  );
};

export const MealsGridItem = memo(MealsGridItemComponent);
