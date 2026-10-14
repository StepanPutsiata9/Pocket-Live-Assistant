import { TouchableOpacity } from 'react-native';

import { Text } from '@/components/ui/text';

import { styles } from './add-button.styles';
import { AddButtonProps } from './add-button.types';

export const AddButton = (props: AddButtonProps) => {
  const { onPress } = props;

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text variant={'body'} colorType={'main'}>
        +
      </Text>
    </TouchableOpacity>
  );
};
