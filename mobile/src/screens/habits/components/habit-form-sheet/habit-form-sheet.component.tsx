import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { memo } from 'react';
import { View } from 'react-native';

import { BottomSheet } from '@/components/ui/bottom-sheet';
import { Input } from '@/components/ui/input';
import { useActiveTranslation } from '@/hooks';

import {
  DayPicker,
  DeleteButton,
  HabitColorPicker,
  IconPicker,
  SubmitButton,
} from './components';
import { useHabitFormSheet } from './habit-form-sheet.hook';
import { styles } from './habit-form-sheet.styles';
import { HabitFormSheetProps } from './habit-form-sheet.types';

const HabitFormSheetComponent = (props: HabitFormSheetProps) => {
  const { sheetRef } = props;
  const { t } = useActiveTranslation();
  const {
    snapPoints,
    onChangeBottomSheet,
    habitName,
    onInputChange,
    selectedDays,
    handleToggleDay,
    selectedColor,
    onColorChange,
    icon,
    onIconChange,
    isEditingHabit,
    onDelete,
    onSubmit,
    isSubmitDisabled,
  } = useHabitFormSheet(props);

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onChange={onChangeBottomSheet}
      bottomSheetBehaviorProps={{ pressBehavior: 'close' }}
      handleIndicatorStyle={styles.handleIndicator}
      enableContentPanningGesture={false}
    >
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.bottomSheetContent}
      >
        <Input
          placeholder={t('Schedule.habits.habitNamePlaceholder')}
          onChangeText={onInputChange}
          value={habitName}
        />

        <DayPicker
          selectedDays={selectedDays}
          handleToggleDay={handleToggleDay}
        />

        <View style={styles.wheelPickersCard}>
          <HabitColorPicker
            onColorChange={onColorChange}
            value={selectedColor.current}
          />

          <IconPicker value={icon.current} onIconChange={onIconChange} />
        </View>

        <SubmitButton
          onPress={onSubmit}
          isEditing={isEditingHabit}
          isSubmitDisabled={isSubmitDisabled}
        />
        <DeleteButton onPress={onDelete} isShown={isEditingHabit} />
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export const HabitFormSheet = memo(HabitFormSheetComponent);
