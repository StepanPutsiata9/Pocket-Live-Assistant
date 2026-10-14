import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { styles } from './checkbox.styles';
import { CheckboxProps } from './checkbox.types';

export const Checkbox = ({
  isChecked,
  style,
  fillStyle,
  checkStyle,
}: CheckboxProps) => {
  styles.useVariants({
    isChecked: isChecked,
  });

  return (
    <View style={[styles.container, style]}>
      <Animated.View style={[styles.fill, fillStyle]} pointerEvents="none" />
      <Animated.View style={checkStyle}>
        <Ionicons name={'checkmark-outline'} style={styles.icon} />
      </Animated.View>
    </View>
  );
};
