import { View } from 'react-native';

import { Text } from '@/components/ui/text';
import { useActiveTranslation } from '@/hooks';

import { styles } from './category-chart.styles';

interface PieCenterLabelProps {
  total: number;
}

export const PieCenterLabel = ({ total }: PieCenterLabelProps) => {
  const { t } = useActiveTranslation();
  return (
    <View style={styles.centerLabel}>
      <Text variant="bodySmall" colorType="main">
        ${total.toFixed(0)}
      </Text>
      <Text variant="caption" colorType="secondary">
        {t('Finance.analytics.total')}
      </Text>
    </View>
  );
};
