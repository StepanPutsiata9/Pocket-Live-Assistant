import { memo } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import { ITEM_HEIGHT } from '../../habit-color-picker.constants';
import { styles } from './habit-color-picker-item.styles';
import { HabitColorPickerItemProps } from './habit-color-picker-item.types';

const HabitColorPickerItemComponent = ({
  color,
}: HabitColorPickerItemProps) => {
  return (
    <Animated.View style={[{ height: ITEM_HEIGHT }, styles.container]}>
      <View
        style={[styles.item, { backgroundColor: color, shadowColor: color }]}
      />
    </Animated.View>
  );
};

export const HabitColorPickerItem = memo(HabitColorPickerItemComponent);
