import { TouchableOpacity } from 'react-native';

import { Text } from '@/components/ui/text';

import { styles } from './day-item.styles';
import { DayItemProps } from './day-item.types';

export const DayItem = ({ name, isSelected, onPress }: DayItemProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={onPress}
    >
      <Text
        variant={'body'}
        style={[styles.text, isSelected && styles.selectedText]}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};
