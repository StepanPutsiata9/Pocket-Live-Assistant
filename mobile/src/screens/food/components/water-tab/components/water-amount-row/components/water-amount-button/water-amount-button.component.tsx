import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';

import { Text } from '@/components/ui/text';
import { useActiveTranslation } from '@/hooks';

import { useWaterAmountButton } from './water-amount-button.hook';
import { styles } from './water-amount-button.styles';
import { WaterAmountButtonProps } from './water-amount-button.types';

export const WaterAmountButtonComponent = (props: WaterAmountButtonProps) => {
  const { translationKey } = props;
  const { handlePress } = useWaterAmountButton(props);

  const { t } = useActiveTranslation();

  return (
    <TouchableOpacity style={styles.waterQuickBtn} onPress={handlePress}>
      <Text variant="bodySmall" colorType="primary">
        +{t(`Food.water.${translationKey}`)}
      </Text>
    </TouchableOpacity>
  );
};

export const WaterAmountButton = memo(WaterAmountButtonComponent);
