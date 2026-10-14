import { StyleProp, ViewStyle } from 'react-native';

import { Priority } from '@/types/task';

export interface TaskItemProps {
  text: string;
  isChecked: boolean;
  priority?: Priority;
  date?: string;
  onPress: () => void;
  onDelete: () => void;
  style?: StyleProp<ViewStyle>;
}
