import { MealCalendarPicker } from '@screens/food/components/meal-calendar-picker';
import { MACROS_CONFIG } from '@screens/food/components/meals-tab';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import { withUnistyles } from 'react-native-unistyles';

import { Text } from '@/components/ui/text';

import { useProgressBarAnimation } from './meals-dashboard.animations.hook';
import { useMealsDashboard } from './meals-dashboard.hook';
import { styles } from './meals-dashboard.styles';

// @ts-ignore
const StyledGradient = withUnistyles(LinearGradient, theme => ({
  colors: theme.colors.gradients.meals,
}));

export const MealsDashboard = () => {
  const { dailyTotals, progressPercent, localCalorieTarget } =
    useMealsDashboard();

  const { t } = useTranslation();
  const { animatedProgressStyle } = useProgressBarAnimation(progressPercent);

  return (
    <StyledGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.dashboardCard}
    >
      <View style={styles.dashboardHeader}>
        <Text variant="h3" colorType="inverse">
          {t('Food.meals.dailySummary')}
        </Text>
        <MealCalendarPicker isInverse={true} />
      </View>

      <View style={styles.caloriesContainer}>
        <Text style={styles.caloriesText}>
          <Text variant="h2" colorType="inverse">
            {dailyTotals.calories}
          </Text>{' '}
          / {localCalorieTarget} {t('Food.meals.cal')}
        </Text>
        <View style={styles.progressBarBackground}>
          <Animated.View
            style={[styles.progressBarFill, animatedProgressStyle]}
          />
        </View>
      </View>

      <View style={styles.macrosRow}>
        {MACROS_CONFIG.map(macro => {
          const storeKey = macro.key === 'proteins' ? 'protein' : macro.key;
          const currentValue =
            dailyTotals?.[storeKey as keyof typeof dailyTotals] || 0;

          return (
            <View key={macro.key} style={styles.macroBadge}>
              <Text
                variant="caption"
                colorType="inverse"
                style={styles.macroLabel}
              >
                {t(macro.translationKey)}
              </Text>
              <Text
                variant="bodySmall"
                colorType="inverse"
                style={styles.macroValue}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {Number(currentValue)}г / {macro.target || 0}г
              </Text>
            </View>
          );
        })}
      </View>
    </StyledGradient>
  );
};
