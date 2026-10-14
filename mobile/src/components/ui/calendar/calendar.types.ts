import { StyleProp, ViewStyle } from 'react-native';

export interface CalendarProps {
  selectedDate?: string;
  onDateSelect: (date: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  modal?: boolean;
  open?: boolean;
  onCancel?: () => void;
}
