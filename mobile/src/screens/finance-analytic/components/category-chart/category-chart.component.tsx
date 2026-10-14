import { useCallback } from 'react';
import { View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { withUnistyles } from 'react-native-unistyles';

import { Text } from '@/components/ui/text';
import { useActiveTranslation } from '@/hooks';

import { PIE_INNER_RADIUS, PIE_RADIUS } from './category-chart.constants';
import { useCategoryChart } from './category-chart.hook';
import { styles } from './category-chart.styles';
import { CategoryChartProps } from './category-chart.types';
import { PieCenterLabel } from './pie-center-label';
import { PieLegend } from './pie-legend';

export const StyledPieChart = withUnistyles(PieChart, theme => ({
  innerCircleColor: theme.colors.background.surface,
}));
export const CategoryChart = ({ titleKey, categories }: CategoryChartProps) => {
  const { t } = useActiveTranslation();
  const { pieData, total } = useCategoryChart(categories);

  const renderCenterLabel = useCallback(() => {
    return <PieCenterLabel total={total} />;
  }, [total]);

  return (
    <View style={styles.sectionCard}>
      <Text variant="h3" colorType="main">
        {t(titleKey)}
      </Text>

      <View style={styles.chartRow}>
        <StyledPieChart
          data={pieData}
          donut
          radius={PIE_RADIUS}
          innerRadius={PIE_INNER_RADIUS}
          centerLabelComponent={renderCenterLabel}
        />

        <PieLegend categories={categories} total={total} />
      </View>
    </View>
  );
};
