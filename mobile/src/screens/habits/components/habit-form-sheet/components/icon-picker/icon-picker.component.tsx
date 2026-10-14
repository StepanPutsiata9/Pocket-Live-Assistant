import WheelPicker from '@quidone/react-native-wheel-picker';
import { memo, useCallback } from 'react';
import { View } from 'react-native';

import { IconPickerItem } from './components/icon-picker-item';
import { ITEM_HEIGHT } from './icon-picker.constants';
import { useIconPicker } from './icon-picker.hook';
import { styles } from './icon-picker.styles';
import { HabitIconPickerProps } from './icon-picker.types';

const IconPickerComponent = (props: HabitIconPickerProps) => {
  const { localValue, handleValueChange, pickerData } = useIconPicker(props);

  const renderOverlay = useCallback(() => {
    return <View style={styles.centerLines} />;
  }, []);

  return (
    <View style={styles.wrapper}>
      <WheelPicker
        style={styles.container}
        data={pickerData}
        value={localValue}
        onValueChanged={handleValueChange}
        visibleItemCount={3}
        itemHeight={ITEM_HEIGHT}
        renderItem={({ item }) => {
          return <IconPickerItem icon={item.value} />;
        }}
        renderOverlay={renderOverlay}
      />
    </View>
  );
};

export const IconPicker = memo(IconPickerComponent);
