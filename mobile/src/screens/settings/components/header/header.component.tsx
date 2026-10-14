import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useUnistyles } from 'react-native-unistyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Text } from '@/components/ui/text';
import { useActiveTranslation, usePressAnimation } from '@/hooks';

import { useHeader } from './header.hook';
import { styles } from './header.styles';

export const Header = () => {
  const { goBack } = useHeader();
  const { animatedStyle, pressHandlers } = usePressAnimation({
    activeScale: 0.9,
  });
  const { t } = useActiveTranslation();
  const { theme } = useUnistyles();

  return (
    <View style={styles.header}>
      <Animated.View style={animatedStyle}>
        <Pressable {...pressHandlers} onPress={goBack}>
          <View style={styles.backButton}>
            <Ionicons
              name="arrow-back-outline"
              size={theme.typography.body.fontSize}
              color={theme.colors.text.main}
            />
          </View>
        </Pressable>
      </Animated.View>

      <Text variant="h2" colorType="main">
        {t('Settings.title')}
      </Text>
    </View>
  );
};
