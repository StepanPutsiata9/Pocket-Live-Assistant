import { MACRO_FIELDS } from '@screens/food/components/meals-tab';
import { View } from 'react-native';
import Animated, { FadeOut } from 'react-native-reanimated';

import { Input } from '@/components/ui/input';
import { useActiveTranslation, useFadeInStagger } from '@/hooks';

import { styles } from './meals-macros-form.styles';
import { MealsMacrosFormProps } from './meals-macros-form.types';

export const MealsMacrosFormComponent = (props: MealsMacrosFormProps) => {
  const {
    showMacros,
    caloriesInput,
    handleCaloriesChange,
    handleMacroChange,
    macros,
  } = props;

  const { t } = useActiveTranslation();

  const { getAnimatedProps } = useFadeInStagger();

  if (!showMacros) {
    return null;
  }

  return (
    <Animated.View style={styles.macrosContainer}>
      <Animated.View
        entering={getAnimatedProps(0)}
        exiting={FadeOut.duration(300)}
      >
        <Input
          value={caloriesInput}
          onChangeText={handleCaloriesChange}
          placeholder={t('Food.meals.calories')}
          keyboardType="numeric"
        />
      </Animated.View>

      <View style={styles.macrosRow}>
        {MACRO_FIELDS.map((field, index) => (
          <Animated.View
            key={field.key}
            style={styles.macroInput}
            entering={getAnimatedProps(index + 1)}
            exiting={FadeOut.duration(150)}
          >
            <Input
              value={macros[field.key] || ''}
              onChangeText={val => handleMacroChange(field.key, val)}
              placeholder={t(field.translationKey)}
              keyboardType="numeric"
              style={styles.macroInput}
            />
          </Animated.View>
        ))}
      </View>
    </Animated.View>
  );
};
