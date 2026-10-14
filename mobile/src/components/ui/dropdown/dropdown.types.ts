import { StyleProp, ViewStyle } from 'react-native';

export interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownProps {
  data: DropdownOption[];
  value: string;
  onSelect: (value: string) => void;
  onOpenChange?: (isOpen: boolean) => void;
  style?: StyleProp<ViewStyle>;
}
