import { colors } from '@theme/tokens';
import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  Pressable,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Input } from '@/components/ui/input';
import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { RecipeCard } from '@/screens/food/components/recipes-tab/components/recipe-card';
import type { Recipe } from '@/types/recipe';

import { CategoryChips } from './components/category-chips';
import { RecipesFilterModal } from './components/recipes-filter-modal';
import { useRecipesTab } from './recipes-tab.hook';
import { styles } from './recipes-tab.styles';

const recipeKeyExtractor = (item: Recipe) => item.id;

const RecipeListRowComponent = ({
  item,
  onPress,
}: {
  item: Recipe;
  onPress: (recipeId: string) => void;
}) => {
  const handlePress = useCallback(() => onPress(item.id), [item.id, onPress]);

  return (
    <RecipeCard
      title={item.title}
      imageUrl={`${item.imageUrl}/medium`}
      onPress={handlePress}
    />
  );
};

const RecipeListRow = React.memo(RecipeListRowComponent);

export const RecipesTab = () => {
  const {
    t,
    query,
    setQuery,
    categories,
    areas,
    activeCategory,
    activeFilter,
    isSavedActive,
    onSelectCategory,
    onSelectSaved,
    isFilterOpen,
    openFilter,
    closeFilter,
    onApplyFilter,
    recipes,
    isLoading,
    isFetching,
    isError,
    refetch,
    openRecipe,
  } = useRecipesTab();

  const renderRecipeItem = useCallback(
    ({ item }: ListRenderItemInfo<Recipe>) => (
      <RecipeListRow item={item} onPress={openRecipe} />
    ),
    [openRecipe],
  );

  return (
    <Screen edges={['bottom']}>
      <View style={styles.container}>
        <Input
          placeholder={t('Food.recipes.searchPlaceholder')}
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          leftIcon={<Ionicons name="search-outline" style={styles.icon} />}
          rightIcon={
            <Pressable onPress={openFilter} hitSlop={8}>
              <Ionicons name="options-outline" style={styles.icon} />
            </Pressable>
          }
        />

        <CategoryChips
          categories={categories}
          activeCategory={activeCategory}
          onSelect={onSelectCategory}
          isSavedActive={isSavedActive}
          onSelectSaved={onSelectSaved}
          savedLabel={t('Food.recipes.saved.chip')}
        />

        <FlatList
          style={styles.list}
          data={recipes}
          keyExtractor={recipeKeyExtractor}
          renderItem={renderRecipeItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshing={isFetching && !isLoading}
          onRefresh={refetch}
          ListEmptyComponent={
            <View style={styles.stateContainer}>
              {isLoading ? (
                <ActivityIndicator color={colors.primary} />
              ) : (
                <Text
                  variant="bodySmall"
                  colorType={isError ? 'error' : 'secondary'}
                >
                  {isError
                    ? t('Food.recipes.error')
                    : isSavedActive
                      ? t('Food.recipes.saved.empty')
                      : t('Food.recipes.empty')}
                </Text>
              )}
            </View>
          }
        />

        <RecipesFilterModal
          visible={isFilterOpen}
          onClose={closeFilter}
          categories={categories}
          areas={areas}
          activeFilter={activeFilter}
          onApply={onApplyFilter}
        />
      </View>
    </Screen>
  );
};
