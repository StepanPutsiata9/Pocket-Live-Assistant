import {
  useFoodUIStore,
  useSelectedDateWater,
  useSetWaterAmount,
} from '@store/food';
import { useCallback, useState } from 'react';

export const useWaterCustomControl = () => {
  const selectedDate = useFoodUIStore(state => state.selectedDate);
  const { mutateAsync: storeSetWaterAmount } = useSetWaterAmount();
  const { data: waterAmount = 0 } = useSelectedDateWater();

  const [isInputVisible, setIsInputVisible] = useState(false);
  const [customValue, setCustomValue] = useState('');

  const setWaterAmount = useCallback(
    async (amount: number) => {
      await storeSetWaterAmount(amount);
    },
    [storeSetWaterAmount],
  );

  const handleCustomSubmit = useCallback(async () => {
    const amount = parseInt(customValue, 10);
    if (!isNaN(amount) && amount > 0) {
      await setWaterAmount(amount);
      setCustomValue('');
      setIsInputVisible(false);
    }
  }, [customValue, setWaterAmount]);

  const handleClear = useCallback(
    () => setWaterAmount(-waterAmount),
    [waterAmount, setWaterAmount],
  );

  const handleAddCustomAmount = useCallback(() => setIsInputVisible(true), []);

  const handleCancel = useCallback(() => {
    setIsInputVisible(false);
    setCustomValue('');
  }, []);

  return {
    isInputVisible,
    customValue,
    setCustomValue,
    handleCustomSubmit,
    setIsInputVisible,
    waterAmount,
    setWaterAmount,
    handleClear,
    handleAddCustomAmount,
    handleCancel,
    selectedDate,
  };
};
