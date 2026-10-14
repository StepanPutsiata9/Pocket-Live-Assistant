import { colors, gradients, sizes } from '@theme/tokens';
import { ImageBackground, Pressable, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Text } from '@/components/ui/text';

import { useRecipeHero } from './recipe-hero.hook';
import { styles } from './recipe-hero.styles';
import { RecipeHeroProps } from './recipe-hero.types';

export const RecipeHero = ({ recipe }: RecipeHeroProps) => {
  const {
    hasError,
    isFavorite,
    isToggling,
    handleGoBack,
    handleImageError,
    handleToggleFavorite,
  } = useRecipeHero({ recipe });

  return (
    <ImageBackground
      source={{ uri: recipe.imageUrl }}
      onError={handleImageError}
      style={styles.container}
      resizeMode="cover"
    >
      {hasError && (
        <Ionicons name="image-outline" style={styles.fallbackIcon} />
      )}

      <LinearGradient colors={[...gradients.scrim]} style={styles.scrim} />

      <View style={styles.buttonsRow}>
        <Pressable
          onPress={handleGoBack}
          hitSlop={12}
          style={styles.backButton}
        >
          <Ionicons
            name="chevron-back"
            size={sizes.icon.md}
            color={colors.white}
          />
        </Pressable>

        <Pressable
          onPress={handleToggleFavorite}
          disabled={isToggling}
          hitSlop={12}
          style={styles.favoriteButton}
        >
          {isFavorite ? (
            <Ionicons
              name="heart"
              size={sizes.icon.md}
              color={colors.primary}
            />
          ) : (
            <Ionicons
              name="heart-outline"
              size={sizes.icon.md}
              color={colors.white}
            />
          )}
        </Pressable>
      </View>

      <Text
        variant="h2"
        colorType="inverse"
        style={styles.title}
        numberOfLines={2}
      >
        {recipe.title}
      </Text>
    </ImageBackground>
  );
};
