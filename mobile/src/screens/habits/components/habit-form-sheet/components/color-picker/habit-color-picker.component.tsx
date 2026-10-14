import WheelPicker from '@quidone/react-native-wheel-picker';
import { memo, useCallback } from 'react';
import { View } from 'react-native';

import { HabitColorPickerItem } from './components/habit-color-picker-item';
import { ITEM_HEIGHT, VISIBLE_ITEMS } from './habit-color-picker.constants';
import { useHabitColorPicker } from './habit-color-picker.hook';
import { styles } from './habit-color-picker.styles';
import {
  HabitColorPickerItemType,
  HabitColorPickerProps,
} from './habit-color-picker.types';

const HabitColorPickerComponent = (props: HabitColorPickerProps) => {
  const { localValue, handleValueChange, pickerData } =
    useHabitColorPicker(props);

  const renderItem = useCallback(({ item }: HabitColorPickerItemType) => {
    return <HabitColorPickerItem color={item.value} />;
  }, []);

  const renderOverlay = useCallback(() => {
    return <View style={styles.centerLines} />;
  }, []);

  return (
    <View style={styles.wrapper}>
      <WheelPicker
        style={styles.container}
        data={pickerData}
        value={localValue}
        itemHeight={ITEM_HEIGHT}
        visibleItemCount={VISIBLE_ITEMS}
        renderItem={renderItem}
        onValueChanged={handleValueChange}
        renderOverlay={renderOverlay}
      />
    </View>
  );
};

export const HabitColorPicker = memo(HabitColorPickerComponent);
