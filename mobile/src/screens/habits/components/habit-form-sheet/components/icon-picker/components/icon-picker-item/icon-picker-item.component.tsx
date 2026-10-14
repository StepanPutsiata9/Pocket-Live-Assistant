import { memo } from 'react';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { ITEM_HEIGHT } from '../../icon-picker.constants';
import { styles } from './icon-picker-item.styles';
import { IconPickerItemProps } from './icon-picker-item.types';

const IconPickerItemComponent = (props: IconPickerItemProps) => {
  const { icon } = props;

  return (
    <View style={[styles.container, { height: ITEM_HEIGHT }]}>
      <Ionicons name={icon} style={styles.icon} size={32} />
    </View>
  );
};

export const IconPickerItem = memo(IconPickerItemComponent);
