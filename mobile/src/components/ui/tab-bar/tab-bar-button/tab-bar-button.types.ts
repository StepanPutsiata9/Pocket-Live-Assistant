import { GestureResponderEvent } from 'react-native';
import { SharedValue } from 'react-native-reanimated';

export interface TabBarButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  onLongPress: (event: GestureResponderEvent) => void;
  isFocused: boolean;
  tabIndex: number;
  dragIndex: SharedValue<number>;
  routeName: string;
  label: string;
}
