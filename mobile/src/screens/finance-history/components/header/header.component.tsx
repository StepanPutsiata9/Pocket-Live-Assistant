import { useNavigation } from '@react-navigation/native';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Text } from '@/components/ui/text';
import { useActiveTranslation, usePressAnimation } from '@/hooks';

import { styles } from './header.styles';

export const HistoryHeader = () => {
  const { t } = useActiveTranslation();
  const navigation = useNavigation();
  const { animatedStyle, pressHandlers } = usePressAnimation({
    activeScale: 0.9,
  });
  return (
    <View style={styles.header}>
      <Animated.View style={animatedStyle}>
        <Pressable
          {...pressHandlers}
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" style={styles.backIcon} />
        </Pressable>
      </Animated.View>

      <Text variant="h2" colorType="main">
        {t('Finance.history')}
      </Text>
    </View>
  );
};
