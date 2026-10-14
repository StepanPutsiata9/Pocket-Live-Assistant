import { useFoodUIStore, useSetWaterAmount } from '@store/food';
import { useCallback } from 'react';

import { WaterAmountButtonProps } from './water-amount-button.types';

export const useWaterAmountButton = (props: WaterAmountButtonProps) => {
  const selectedDate = useFoodUIStore(state => state.selectedDate);
  const { mutateAsync: storeSetWaterAmount } = useSetWaterAmount();

  const { amount } = props;

  const handlePress = useCallback(async () => {
    await storeSetWaterAmount(amount);
  }, [amount, storeSetWaterAmount]);

  return {
    handlePress,
    selectedDate,
  };
};
