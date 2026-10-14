import { HabitStructure } from '@screens/habits';
import { RefObject } from 'react';

import { BottomSheetRef } from '@/components/ui/bottom-sheet';

export interface HabitFormSheetProps {
  sheetRef: RefObject<BottomSheetRef | null>;
  editingHabit: HabitStructure | null;
}
