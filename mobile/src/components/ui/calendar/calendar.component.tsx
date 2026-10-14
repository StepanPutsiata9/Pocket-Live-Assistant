import { useState } from 'react';
import { Modal, Pressable, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useUnistyles } from 'react-native-unistyles';

import { Button } from '@/components/ui/button';
import { useActiveTranslation } from '@/hooks';

import { Text } from '../text';
import { styles } from './calendar.styles';
import { CalendarProps } from './calendar.types';
import { dateStringToDate, dateToDateString } from './calendar.utils';

export const Calendar = ({
  selectedDate,
  onDateSelect,
  containerStyle,
  modal,
  open,
  onCancel,
}: CalendarProps) => {
  const { theme } = useUnistyles();
  const { i18n, t } = useActiveTranslation();
  const [pendingDate, setPendingDate] = useState(
    dateStringToDate(selectedDate),
  );

  const picker = (
    <DatePicker
      mode="date"
      date={modal ? pendingDate : dateStringToDate(selectedDate)}
      onDateChange={date =>
        modal ? setPendingDate(date) : onDateSelect(dateToDateString(date))
      }
      locale={i18n.language}
      theme={theme.type === 'dark' ? 'dark' : 'light'}
      textColor={theme.colors.text.main}
      fadeToColor={theme.colors.background.surface}
      dividerHeight={1}
      androidVariant="iosClone"
    />
  );

  if (modal) {
    return (
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={onCancel}
      >
        <Pressable style={styles.overlay} onPress={onCancel}>
          <Pressable style={styles.card}>
            <Text colorType="main" variant="h2" style={styles.title}>
              {t('Common.selectDate')}
            </Text>
            <View style={styles.pickerContainer}>{picker}</View>
            <View style={styles.buttonsRow}>
              <Button
                variant="outline"
                title={t('Common.cancel')}
                style={styles.button}
                onPress={onCancel}
              />
              <Button
                variant="primary"
                title={t('Common.confirm')}
                style={styles.button}
                onPress={() => onDateSelect(dateToDateString(pendingDate))}
              />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    );
  }

  return <View style={[styles.pickerContainer, containerStyle]}>{picker}</View>;
};
