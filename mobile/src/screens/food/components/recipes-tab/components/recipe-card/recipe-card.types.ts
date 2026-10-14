import { StyleProp, ViewStyle } from 'react-native';

export interface RecipeCardProps {
  title: string;
  imageUrl: string;
  tags?: string[];
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}
