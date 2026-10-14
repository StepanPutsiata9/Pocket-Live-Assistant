import { RouteProp, useRoute } from '@react-navigation/native';
import { colors } from '@theme/tokens';
import { ActivityIndicator, ScrollView, View } from 'react-native';

import { Badge } from '@/components/ui/badge';
import { getVariantByIndex } from '@/components/ui/badge/badge.helpers';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useActiveTranslation } from '@/hooks';
import { RootStackParamList } from '@/navigation/app-navigator.types';

import { IngredientRow } from './components/ingredient-row';
import { RecipeHero } from './components/recipe-hero';
import { useRecipeDetails } from './recipe-details.hook';
import { styles } from './recipe-details.styles';

export const RecipeDetailsScreen = () => {
  const { t } = useActiveTranslation();
  const { recipeId } =
    useRoute<RouteProp<RootStackParamList, 'RecipeDetails'>>().params;
  const { recipe, isLoading, isError, refetch, handleWatchVideo } =
    useRecipeDetails(recipeId);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator
          color={colors.primary}
          accessibilityLabel={t('Food.recipes.details.loading')}
        />
      </View>
    );
  }

  if (isError || !recipe) {
    return (
      <View style={styles.centered}>
        <Text variant="body" colorType="secondary">
          {t('Food.recipes.details.error')}
        </Text>
        <Button
          title={t('Food.recipes.details.retry')}
          onPress={() => refetch()}
        />
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    >
      <RecipeHero recipe={recipe} />

      {recipe.tags.length > 0 && (
        <View style={styles.section}>
          <Text variant="h3" accessibilityRole="header">
            {t('Food.recipes.details.tags')}
          </Text>
          <View style={styles.tagRow}>
            {recipe.tags.map((tag, index) => (
              <Badge
                key={index}
                label={tag}
                variant={getVariantByIndex(index)}
                containerStyle={styles.tag}
              />
            ))}
          </View>
        </View>
      )}

      <View style={styles.section}>
        <Text variant="h3" accessibilityRole="header">
          {t('Food.recipes.details.ingredients')}
        </Text>
        {recipe.ingredients.map((ingredient, index) => (
          <IngredientRow
            key={index}
            name={ingredient.name}
            measure={ingredient.measure}
          />
        ))}
      </View>

      <View style={styles.section}>
        <Text variant="h3" accessibilityRole="header">
          {t('Food.recipes.details.instructions')}
        </Text>
        <Text variant="body" colorType="secondary" style={styles.instructions}>
          {recipe.instructions}
        </Text>
      </View>

      {recipe.youtubeUrl && (
        <View style={styles.section}>
          <Button
            title={t('Food.recipes.details.watchVideo')}
            onPress={handleWatchVideo}
          />
        </View>
      )}
    </ScrollView>
  );
};
