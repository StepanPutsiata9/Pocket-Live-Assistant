import { View } from 'react-native';

import { Text } from '@/components/ui/text';

import { styles } from './ingredient-row.styles';
import { IngredientRowProps } from './ingredient-row.types';

export const IngredientRow = ({ name, measure }: IngredientRowProps) => {
  return (
    <View style={styles.row}>
      <Text variant="body">{name}</Text>
      <View style={styles.leader} />
      <Text variant="body">{measure}</Text>
    </View>
  );
};
