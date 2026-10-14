import { LinearGradientProps } from 'react-native-linear-gradient';

export type WidgetThemeName =
  | 'finance'
  | 'water'
  | 'tasks'
  | 'calories'
  | 'habits'
  | 'mood';
export type WidgetSizes = 'small' | 'large';

export interface MetricCardProps extends Partial<LinearGradientProps> {
  children: React.ReactNode;
  themeName: WidgetThemeName;
  size?: WidgetSizes;
}
