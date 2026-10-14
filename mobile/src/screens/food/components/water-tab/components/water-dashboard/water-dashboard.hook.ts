import { TARGET_WATER } from '@screens/food/components/water-tab/water-tab.constants';
import { useSelectedDateWater } from '@store/food';

import { getProgressPercent } from './water-dashboard.utils';

export const useWaterDashboard = () => {
  const { data: waterAmount = 0 } = useSelectedDateWater();

  const progressPercentage = getProgressPercent(waterAmount, TARGET_WATER);

  return {
    waterAmount,
    progressPercentage,
  };
};
