import { ComponentType } from 'react';

import { WidgetThemeName } from '@/components/ui/metric-card/metric-card.types';

export interface HomeMetricWidgetProps {
  themeName: WidgetThemeName;
  icon: string;
  IconComponent?: ComponentType<{ name: string; style?: any }>;
  value: string | number;
  label: string;
  unit?: string;
  onPress?: () => void;
}
