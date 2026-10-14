import { BottomSheetBehaviorProps } from './bottom-sheet.types';

export const DEFAULT_SNAP_POINTS = ['50%'];

export const DEFAULT_BEHAVIOR_PROPS: Required<BottomSheetBehaviorProps> = {
  disappearsOnIndex: -1,
  appearsOnIndex: 0,
  pressBehavior: 'close',
};
