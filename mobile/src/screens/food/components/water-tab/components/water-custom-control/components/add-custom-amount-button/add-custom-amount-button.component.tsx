import { memo } from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { Button } from '@/components/ui/button';
import { useActiveTranslation } from '@/hooks';

import { styles } from './add-custom-amount-button.styles';
import { AddCustomAmountButtonProps } from './add-custom-amount-button.types';

const AddCustomAmountButtonComponent = (props: AddCustomAmountButtonProps) => {
  const { onPress } = props;
  const { t } = useActiveTranslation();

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(150)}
    >
      <Button
        title={t('Food.water.customAmount')}
        onPress={onPress}
        variant="primary"
        style={[styles.customAmountBtn, styles.btnMarginReset]}
      />
    </Animated.View>
  );
};

export const AddCustomAmountButton = memo(AddCustomAmountButtonComponent);
