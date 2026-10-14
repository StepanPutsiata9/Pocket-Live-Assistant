import { Pressable } from 'react-native';
import Animated from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Text } from '@/components/ui/text';
import { useActiveTranslation, usePressAnimation } from '@/hooks';

import { styles } from './delete-button.styles';
import { DeleteButtonProps } from './delete-button.types';

export const DeleteButton = (props: DeleteButtonProps) => {
  const { onPress, isShown } = props;
  const { t } = useActiveTranslation();
  const { animatedStyle, pressHandlers } = usePressAnimation({
    activeScale: 0.98,
  });

  if (!isShown) {
    return null;
  }

  return (
    <Animated.View style={animatedStyle}>
      <Pressable {...pressHandlers} style={styles.container} onPress={onPress}>
        <Ionicons name="trash" style={styles.icon} />
        <Text variant="h3" colorType={'inverse'}>
          {t('Schedule.habits.delete')}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
