import { gradients } from '@theme/tokens';
import React from 'react';
import { ImageBackground, Pressable, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';

import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { usePressAnimation } from '@/hooks';

import { styles } from './recipe-card.styles';
import { RecipeCardProps } from './recipe-card.types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const RecipeCardComponent = ({
  title,
  imageUrl,
  tags,
  onPress,
  style,
}: RecipeCardProps) => {
  const { animatedStyle, pressHandlers } = usePressAnimation();

  return (
    <AnimatedPressable
      {...pressHandlers}
      style={[styles.container, style, animatedStyle]}
      onPress={onPress}
      disabled={!onPress}
    >
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      >
        <LinearGradient colors={[...gradients.scrim]} style={styles.scrim} />

        <View style={styles.content}>
          <Text variant={'h2'} colorType={'inverse'} numberOfLines={2}>
            {title}
          </Text>

          {!!tags?.length && (
            <View style={styles.tagRow}>
              {tags.map(tag => (
                <Badge key={tag} label={tag} />
              ))}
            </View>
          )}
        </View>
      </ImageBackground>
    </AnimatedPressable>
  );
};

export const RecipeCard = React.memo(RecipeCardComponent);
