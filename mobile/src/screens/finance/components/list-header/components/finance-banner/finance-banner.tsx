import { useNavigation } from '@react-navigation/native';
import { gradients } from '@theme/tokens';
import { Pressable, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Text } from '@/components/ui/text';
import { useActiveTranslation, usePressAnimation } from '@/hooks';
import { useBalance } from '@/screens/finance/hooks';

import { styles } from './finance-banner.styles';

export const FinanceBanner = () => {
  const { t } = useActiveTranslation();
  const navigation = useNavigation();
  const { formattedBalance } = useBalance();
  const { animatedStyle, pressHandlers } = usePressAnimation({
    activeScale: 0.93,
  });
  return (
    <LinearGradient
      colors={[...gradients.finance]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.financeBanner}
    >
      <View style={styles.bannerTopRow}>
        <Text variant="h3" colorType="inverse" style={styles.bannerTitleText}>
          {t('Finance.bannerTitleText')}
        </Text>
        <Text variant="h1" colorType="inverse">
          {formattedBalance}$
        </Text>
      </View>
      <Animated.View style={animatedStyle}>
        <Pressable
          {...pressHandlers}
          onPress={() => navigation.navigate('FinanceAnalytics')}
          style={styles.analyticsButton}
          hitSlop={8}
        >
          <Ionicons name="bar-chart-outline" style={styles.analyticsIcon} />
        </Pressable>
      </Animated.View>
    </LinearGradient>
  );
};
