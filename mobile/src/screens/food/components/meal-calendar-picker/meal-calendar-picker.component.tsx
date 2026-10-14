import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Calendar } from '@/components/ui/calendar';
import { Text } from '@/components/ui/text';
import { MealCalendarPickerProps } from '@/screens/food/components/meals-tab';
import { sizes } from '@/theme/tokens';

import { useMealCalendarPicker } from './meal-calendar-picker.hook';
import { styles } from './meal-calendar-picker.styles';

export const MealCalendarPicker = ({
  isInverse = false,
}: MealCalendarPickerProps) => {
  const {
    isModalVisible,
    setIsModalVisible,
    formattedDate,
    selectedDate,
    handleDateSelect,
  } = useMealCalendarPicker();

  styles.useVariants({ isInverse });

  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        style={styles.calendarContainer}
        activeOpacity={0.7}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text variant="bodySmall" style={styles.calendarDateText}>
          {formattedDate}
        </Text>
        <Icon
          name="calendar-outline"
          size={sizes.icon.md}
          color={styles.calendarIcon.color}
        />
      </TouchableOpacity>

      <Calendar
        modal
        open={isModalVisible}
        selectedDate={selectedDate}
        onDateSelect={date => {
          handleDateSelect(date);
          setIsModalVisible(false);
        }}
        onCancel={() => setIsModalVisible(false)}
      />
    </View>
  );
};
