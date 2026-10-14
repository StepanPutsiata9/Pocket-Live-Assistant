import { WATER_AMOUNTS } from '@screens/food/components/water-tab/water-tab.constants';
import { memo } from 'react';
import { View } from 'react-native';

import { WaterAmountButton } from './components/water-amount-button';
import { styles } from './water-amount-row.styles';

const WaterAmountRowComponent = () => {
  return (
    <View style={styles.waterRow}>
      {WATER_AMOUNTS.map((amount: number) => {
        const translationKey =
          amount === 1000 ? 'amount1l' : `amount${amount}ml`;

        return (
          <WaterAmountButton
            key={amount}
            amount={amount}
            translationKey={translationKey}
          />
        );
      })}
    </View>
  );
};

export const WaterAmountRow = memo(WaterAmountRowComponent);
