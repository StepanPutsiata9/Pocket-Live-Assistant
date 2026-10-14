import { memo } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useActiveTranslation } from '@/hooks';

import { styles } from './add-custom-amount-form.styles';
import { AddCustomAmountFormProps } from './add-custom-amount-form.types';

const AddCustomAmountFormComponent = (props: AddCustomAmountFormProps) => {
  const { t } = useActiveTranslation();
  const { customValue, setCustomValue, handleCustomSubmit, handleCancel } =
    props;

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(150)}
      style={styles.animatedWidth}
    >
      <View style={styles.inputRow}>
        <TextInput
          style={styles.customTextInput}
          placeholder="0"
          keyboardType="numeric"
          value={customValue}
          onChangeText={setCustomValue}
          autoFocus
        />

        <TouchableOpacity
          onPress={handleCustomSubmit}
          activeOpacity={0.8}
          style={styles.submitButton}
        >
          <Text variant="bodySmall" style={styles.submitButtonText}>
            {t('Food.meals.addBtn')}
          </Text>
        </TouchableOpacity>
      </View>

      <Button
        title={t('Food.water.cancel')}
        onPress={handleCancel}
        variant="outline"
        style={[styles.customAmountBtn, styles.btnClearMargin]}
      />
    </Animated.View>
  );
};

export const AddCustomAmountForm = memo(AddCustomAmountFormComponent);
