import { View } from 'react-native';

import { Card } from '@/components/ui/card';
import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { useActiveTranslation } from '@/hooks';

import { AddButton, HabitFormSheet, HabitsList } from './components';
import { useHabits } from './habits.hook';
import { styles } from './habits.styles';

export function HabitsScreen() {
  const { t } = useActiveTranslation();
  const {
    bottomSheetRef,
    handleOpenBottomSheet,
    habits,
    handleWidgetPress,
    editingHabit,
  } = useHabits();

  return (
    <Screen edges={['bottom']}>
      <View style={styles.container}>
        <Card style={styles.titleCard}>
          <Text variant={'h3'}>{t('Schedule.habits.title')}</Text>
          <AddButton onPress={handleOpenBottomSheet} />
        </Card>

        <HabitsList habits={habits} onHabitPress={handleWidgetPress} />

        <HabitFormSheet editingHabit={editingHabit} sheetRef={bottomSheetRef} />
      </View>
    </Screen>
  );
}
