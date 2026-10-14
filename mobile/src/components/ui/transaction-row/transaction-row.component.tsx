import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Text } from '@/components/ui/text';

import { styles } from './transaction-row.styles';
import { TransactionRowProps } from './transaction-row.types';

export const TransactionRow = ({
  item,
  categoryLabel,
  formattedDate,
  formattedAmount,
}: TransactionRowProps) => {
  const { type, description } = item;
  styles.useVariants({ type });

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Ionicons
          name={type === 'income' ? 'arrow-up' : 'arrow-down'}
          style={styles.icon}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text variant="bodySmall" colorType="main" numberOfLines={1}>
          {description.length > 15
            ? description.slice(0, 15) + '...'
            : description || categoryLabel}
        </Text>
        <Text
          variant="caption"
          colorType="secondary"
          style={styles.categoryText}
        >
          {categoryLabel}
        </Text>
        <Text
          variant="caption"
          colorType="secondary"
          style={styles.categoryText}
        >
          {formattedDate}
        </Text>
      </View>

      <View style={styles.rightContainer}>
        <Text variant="h3" style={styles.amountText}>
          {type === 'income' ? '+' : '-'}
          {formattedAmount.length > 15
            ? formattedAmount.slice(0, 15) + '...'
            : formattedAmount}
        </Text>
      </View>
    </View>
  );
};
