import { MealCalendarPicker } from '@screens/food/components/meal-calendar-picker';
import { TARGET_WATER } from '@screens/food/components/water-tab/water-tab.constants';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import { useUnistyles, withUnistyles } from 'react-native-unistyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Text } from '@/components/ui/text';
import { useActiveTranslation } from '@/hooks';

import { useWaterDashboardAnimations } from './water-dashboard.animations.hook';
import { useWaterDashboard } from './water-dashboard.hook';
import { styles } from './water-dashboard.styles';

const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);

// @ts-ignore
const StyledGradient = withUnistyles(LinearGradient, theme => ({
  colors: theme.colors.gradients.water,
}));

export const WaterDashboard = () => {
  const { waterAmount, progressPercentage } = useWaterDashboard();
  const { animatedProgressStyle, animatedDropStyle } =
    useWaterDashboardAnimations(progressPercentage, waterAmount);
  const { t } = useActiveTranslation();
  const { theme } = useUnistyles();

  return (
    <StyledGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.waterBanner}
    >
      <View style={styles.dateContainer}>
        <Text variant="h3" style={styles.bannerTitleWorkaround}>
          {t('Food.meals.dailySummary')}
        </Text>

        <MealCalendarPicker isInverse />
      </View>

      <View style={styles.waterBannerHeader}>
        <Animated.View style={animatedDropStyle}>
          <AnimatedIonicons
            name="water-outline"
            size={theme.sizes.icon.xl}
            color={theme.colors.simple.white}
          />
        </Animated.View>

        <View style={styles.waterTextRight}>
          <Text style={styles.waterVolume}>
            {waterAmount}
            {t('Food.water.volume')}
          </Text>

          <Text variant="caption" style={styles.waterGoal}>
            {t('Food.water.goal', { count: TARGET_WATER })}
          </Text>
        </View>
      </View>

      <View style={styles.waterProgressBg}>
        <Animated.View
          style={[styles.waterProgressFill(0), animatedProgressStyle]}
        />
      </View>
    </StyledGradient>
  );
};
