import { Text, View } from 'react-native';

import { styles } from './badge.styles';
import { BadgeProps } from './badge.types';

export const Badge = ({
  label,
  variant = 'neutral',
  textStyle,
  containerStyle,
}: BadgeProps) => {
  styles.useVariants({ variant });

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.text, textStyle]}>{label}</Text>
    </View>
  );
};
