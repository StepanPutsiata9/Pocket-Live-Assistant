import { memo } from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { Button } from '@/components/ui/button';
import { useActiveTranslation } from '@/hooks';

import { styles } from './clear-button.styles';
import { ClearButtonProps } from './clear-button.types';

const ClearButtonComponent = (props: ClearButtonProps) => {
  const { waterAmount, onPress } = props;
  const { t } = useActiveTranslation();

  if (waterAmount <= 0) {
    return null;
  }

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(150)}
    >
      <Button
        title={t('Food.water.clearBtn')}
        onPress={onPress}
        variant="outline"
        style={[styles.customAmountBtn, styles.btnClearMargin]}
      />
    </Animated.View>
  );
};

export const ClearButton = memo(ClearButtonComponent);
