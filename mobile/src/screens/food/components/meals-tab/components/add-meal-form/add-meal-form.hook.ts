import { BackendError } from '@screens/food/components/meals-tab';
import { MealType, useAddFood } from '@store/food';
import axios from 'axios';
import { useState } from 'react';

export const useAddMealForm = () => {
  const [foodName, setFoodName] = useState('');
  const [showMacros, setShowMacros] = useState(false);
  const [mealType, setMealType] = useState<MealType | ''>('');
  const [caloriesInput, setCaloriesInput] = useState('');
  const [macros, setMacros] = useState<Record<string, string>>({
    proteins: '',
    fats: '',
    carbs: '',
  });
  const [error, setError] = useState<string | null>(null);

  const { mutateAsync: addFood } = useAddFood();

  const isFormInvalid = !foodName.trim() || !mealType;

  const handleAddMealPress = async () => {
    if (isFormInvalid || !mealType) return;

    try {
      setError(null);
      await addFood({
        type: mealType,
        name: foodName,
        caloriesInput: caloriesInput || '0',
        protein: macros.proteins || '0',
        fats: macros.fats || '0',
        carbs: macros.carbs || '0',
      });

      setFoodName('');
      setMealType('');
      setCaloriesInput('');
      setMacros({ proteins: '', fats: '', carbs: '' });
      setShowMacros(false);
    } catch (err) {
      if (axios.isAxiosError<BackendError>(err)) {
        setError(err.response?.data?.error || 'Food.errors.foodSaveError');
      } else {
        setError('Food.errors.foodSaveError');
      }
    }
  };

  const handleMacroChange = (key: string, value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setMacros(prev => ({ ...prev, [key]: numericValue }));
  };

  const handleCaloriesChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setCaloriesInput(numericValue);
  };

  return {
    foodName,
    setFoodName,
    showMacros,
    setShowMacros,
    isFormInvalid,
    handleAddMealPress,
    mealType,
    setMealType,
    handleMacroChange,
    handleCaloriesChange,
    macros,
    caloriesInput,
    error,
  };
};
