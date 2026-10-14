import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useUnistyles } from 'react-native-unistyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Text } from '@/components/ui/text';
import { usePressAnimation } from '@/hooks';

import { styles } from './language-switcher.styles';
import { useLogoutButton } from './logout-button.hook';

export const LogoutButton = () => {
  const { t, handleLogout } = useLogoutButton();
  const { animatedStyle, pressHandlers } = usePressAnimation({
    activeScale: 0.98,
  });
  const { theme } = useUnistyles();

  return (
    <Animated.View style={animatedStyle}>
      <Pressable {...pressHandlers} onPress={handleLogout}>
        <View style={styles.container}>
          <Ionicons
            name="log-out-outline"
            size={theme.typography.h2.fontSize}
            color={theme.colors.status.error}
          />
          <Text variant="h3" colorType="error">
            {t('Settings.logout')}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
};
