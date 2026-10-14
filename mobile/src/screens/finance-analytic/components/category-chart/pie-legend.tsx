import { View } from 'react-native';

import { Text } from '@/components/ui/text';
import { getChartColor } from '@/theme/tokens/chartColors';

import { styles } from './category-chart.styles';
import { CategoryEntry } from './category-chart.types';

interface PieLegendProps {
  categories: CategoryEntry[];
  total: number;
}

export const PieLegend = ({ categories, total }: PieLegendProps) => {
  return (
    <View style={styles.legend}>
      {categories.map((cat, i) => {
        const color = getChartColor(i);
        const pct = total > 0 ? ((cat.amount / total) * 100).toFixed(1) : '0';
        return (
          <View key={cat.id} style={styles.legendRow}>
            <View style={[styles.legendDot, { backgroundColor: color }]} />
            <View style={styles.legendInfo}>
              <Text
                variant="bodySmall"
                colorType="main"
                style={styles.legendLabel}
                numberOfLines={1}
              >
                {cat.label}
              </Text>
              <Text variant="caption" colorType="secondary">
                {cat.amount.toFixed(2)}$ |
                <Text style={styles.legendPct}> {pct}%</Text>
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};
