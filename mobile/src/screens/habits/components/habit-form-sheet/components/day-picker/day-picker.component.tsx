import { HABIT_WEEK_DAYS } from '@screens/habits';
import { memo } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { useActiveTranslation } from '@/hooks';

import { DayItem } from './components/day-item';
import { styles } from './day-picker.styles';
import { DayPickerProps } from './day-picker.types';

const DayPickerComponent = (props: DayPickerProps) => {
  const { t } = useActiveTranslation();

  const { selectedDays, handleToggleDay } = props;

  return (
    <Card style={styles.card}>
      <Text variant={'h3'} style={styles.title}>
        {t('Schedule.habits.dayPick')}
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        disallowInterruption
      >
        {HABIT_WEEK_DAYS.map(day => {
          const localizedDayName = t(`Schedule.habits.days.${day}`);
          return (
            <DayItem
              key={day}
              name={localizedDayName}
              isSelected={selectedDays.includes(day)}
              onPress={() => handleToggleDay(day)}
            />
          );
        })}
      </ScrollView>
    </Card>
  );
};

export const DayPicker = memo(DayPickerComponent);
