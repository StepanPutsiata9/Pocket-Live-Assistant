import { format } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';
import { useState } from 'react';

import { useActiveTranslation } from '@/hooks';
import { useFoodUIStore } from '@/store/food';

export const useMealCalendarPicker = () => {
  const { i18n } = useActiveTranslation();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const selectedDate = useFoodUIStore(state => state.selectedDate);
  const setSelectedDate = useFoodUIStore(state => state.setSelectedDate);

  const handleDateSelect = (dateString: string) => {
    setSelectedDate(dateString);
    setIsModalVisible(false);
  };

  const dateObj = new Date(selectedDate);

  const formattedDate = format(dateObj, 'd MMMM', {
    locale: i18n.language === 'ru' ? ru : enUS,
  });

  return {
    selectedDate,
    isModalVisible,
    setIsModalVisible,
    handleDateSelect,
    formattedDate,
  };
};
