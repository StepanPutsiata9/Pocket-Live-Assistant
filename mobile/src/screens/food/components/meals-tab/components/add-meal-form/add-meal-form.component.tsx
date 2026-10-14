import Animated, { LinearTransition } from 'react-native-reanimated';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { useActiveTranslation } from '@/hooks';

import { useAddMealForm } from './add-meal-form.hook';
import { styles } from './add-meal-form.styles';
import { MealsCategoryRowComponent } from './components/meals-category-row';
import { MealsMacrosFormComponent } from './components/meals-macros-form';

const AnimatedCard = Animated.createAnimatedComponent(Card);

export const AddMealForm = () => {
  const {
    foodName,
    setFoodName,
    setShowMacros,
    showMacros,
    isFormInvalid,
    handleAddMealPress,
    mealType,
    setMealType,
    handleCaloriesChange,
    handleMacroChange,
    macros,
    caloriesInput,
  } = useAddMealForm();

  const { t } = useActiveTranslation();

  return (
    <AnimatedCard layout={LinearTransition} style={styles.container}>
      <Text variant="h3" colorType="main" style={styles.cardTitle}>
        {t('Food.meals.addMealTitle')}
      </Text>

      <MealsCategoryRowComponent
        mealType={mealType}
        setMealType={setMealType}
      />

      <Input
        value={foodName}
        onChangeText={setFoodName}
        placeholder={t('Food.meals.placeholderWhat')}
        style={styles.foodNameInput}
      />

      <MealsMacrosFormComponent
        macros={macros}
        handleMacroChange={handleMacroChange}
        showMacros={showMacros}
        handleCaloriesChange={handleCaloriesChange}
        caloriesInput={caloriesInput}
      />

      <Animated.View style={styles.buttonsRow} layout={LinearTransition}>
        <Button
          title={
            showMacros ? t('Food.meals.hideMacros') : t('Food.meals.addMacros')
          }
          variant="outline"
          onPress={() => setShowMacros(!showMacros)}
          style={styles.hideMacrosBtn}
        />
        <Button
          title={t('Food.meals.addBtn')}
          variant="primary"
          onPress={handleAddMealPress}
          disabled={isFormInvalid}
          style={styles.addMealBtn}
        />
      </Animated.View>
    </AnimatedCard>
  );
};
