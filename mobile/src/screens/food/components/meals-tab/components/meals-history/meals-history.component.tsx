import { View } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { useActiveTranslation } from '@/hooks';
import { FoodItem } from '@/store/food';

import { useMealsHistory } from './meals-history.hook';
import { styles } from './meals-history.styles';

export const MealsHistory = () => {
  const { history, clearHistory } = useMealsHistory();

  const { t } = useActiveTranslation();

  return (
    <Animated.View layout={LinearTransition}>
      <Card style={styles.historyCard}>
        <View style={styles.historyHeader}>
          <Text style={styles.historyTitleText}>
            {t('Food.meals.historyTitle')}
          </Text>
          {history.length > 0 && (
            <Icon
              name="trash-outline"
              style={styles.trashIcon}
              onPress={clearHistory}
            />
          )}
        </View>

        {history.length === 0 ? (
          <Text
            variant="bodySmall"
            colorType="secondary"
            style={styles.emptyText}
          >
            {t('Food.meals.noEntries')}
          </Text>
        ) : (
          <View style={styles.historyList}>
            {history.map((item: FoodItem) => (
              <Animated.View
                key={item.id}
                style={styles.historyItem}
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(200)}
              >
                <View style={styles.historyRow}>
                  <Text
                    variant="body"
                    colorType="main"
                    style={styles.historyName}
                  >
                    {item.name}
                  </Text>
                  <Text
                    variant="body"
                    colorType="main"
                    style={styles.historyCalories}
                  >
                    {item.calories} {t('Food.meals.cal')}
                  </Text>
                </View>

                <View style={styles.historyRow}>
                  <Text variant="caption" colorType="secondary">
                    {t(`Food.meals.${item.type}`)}
                  </Text>
                  {(item.protein || item.fats || item.carbs) && (
                    <Text
                      variant="bodySmall"
                      colorType="secondary"
                      style={styles.historyMacros}
                    >
                      {[
                        { key: 'proteins', val: item.protein },
                        { key: 'fats', val: item.fats },
                        { key: 'carbs', val: item.carbs },
                      ]
                        .map(
                          m => `${t(`Food.meals.${m.key}`)}: ${m.val || '0'}`,
                        )
                        .join(' | ')}
                    </Text>
                  )}
                </View>
              </Animated.View>
            ))}
          </View>
        )}
      </Card>
    </Animated.View>
  );
};
