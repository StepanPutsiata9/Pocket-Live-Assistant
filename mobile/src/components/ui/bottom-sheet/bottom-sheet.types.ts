import {
  BottomSheetModalProps,
  BottomSheetProps as GorhomBottomSheetProps,
} from '@gorhom/bottom-sheet';
import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface BottomSheetRef {
  open: () => void;
  close: () => void;
  openOnIndex: (index: number) => void;
}

export type PressBehaviorType = 'close' | 'none' | 'collapse';

export interface BottomSheetBehaviorProps {
  disappearsOnIndex?: number;
  appearsOnIndex?: number;
  pressBehavior?: PressBehaviorType;
}

export interface BottomSheetProps extends Omit<
  BottomSheetModalProps,
  'children' | 'backdropComponent'
> {
  children: ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  onClose?: () => void;
  bottomSheetBehaviorProps?: BottomSheetBehaviorProps;
}
