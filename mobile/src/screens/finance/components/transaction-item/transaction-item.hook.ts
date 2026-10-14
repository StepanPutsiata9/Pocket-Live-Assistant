import { format } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';
import { useMemo, useRef } from 'react';
import { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

import { useActiveTranslation } from '@/hooks';
import { formatAmount } from '@/screens/finance/currency.helpers';
import { Transaction } from '@/screens/finance/finance.types';
import { useFinanceStore } from '@/store/finance';

export const useItem = (item: Transaction, onDelete?: (id: string) => void) => {
  const { type, description, amount, category, date, currency } = item;
  const { t, i18n } = useActiveTranslation();
  const customCategories = useFinanceStore(state => state.customCategories);

  const swipeableRef = useRef<SwipeableMethods>(null);

  const height = useSharedValue<number | undefined>(undefined);
  const marginBottom = useSharedValue<number>(12);
  const opacity = useSharedValue(1);

  const isIncome = type === 'income';
  const formattedAmount = formatAmount(amount, currency);

  const formattedDate = useMemo(() => {
    if (!date) return '';
    return format(new Date(date), 'dd MMMM yyyy', {
      locale: i18n.language === 'ru' ? ru : enUS,
    });
  }, [date, i18n.language]);

  const categoryName = useMemo(() => {
    const customCat = customCategories.find(c => c.id === category);
    if (customCat) {
      return customCat.name;
    }

    return t(`Finance.categories.${category}`);
  }, [category, customCategories, t]);

  const handleDelete = () => {
    opacity.value = withTiming(0, { duration: 250 });

    height.value = withDelay(200, withTiming(0, { duration: 200 }));
    marginBottom.value = withDelay(
      200,
      withTiming(0, { duration: 200 }, finished => {
        if (finished && onDelete) {
          scheduleOnRN(onDelete, item.id);
        }
      }),
    );
  };

  const handleSwipeableWillOpen = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      handleDelete();
    }
  };

  const animatedContainerStyle = useAnimatedStyle(() => ({
    height: height.value,
    marginBottom: marginBottom.value,
    opacity: opacity.value,
    overflow: 'hidden',
  }));

  return {
    swipeableRef,
    animatedContainerStyle,
    handleSwipeableWillOpen,
    isIncome,
    formattedAmount,
    formattedDate,
    description,
    category: categoryName,
  };
};
