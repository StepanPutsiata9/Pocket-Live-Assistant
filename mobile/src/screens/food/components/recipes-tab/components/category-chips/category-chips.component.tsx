import { ReactNode } from 'react';
import { FlatList, Pressable, StyleProp, View, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

import { Text } from '@/components/ui/text';
import { usePressAnimation } from '@/hooks';

import { styles } from './category-chips.styles';
import { CategoryChipsProps } from './category-chips.types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface AnimatedChipProps {
  onPress: () => void;
  style: StyleProp<ViewStyle>;
  children: ReactNode;
}

const AnimatedChip = ({ onPress, style, children }: AnimatedChipProps) => {
  const { animatedStyle, pressHandlers } = usePressAnimation();

  return (
    <AnimatedPressable
      {...pressHandlers}
      onPress={onPress}
      style={[style, animatedStyle]}
    >
      {children}
    </AnimatedPressable>
  );
};

export const CategoryChips = ({
  categories,
  activeCategory,
  onSelect,
  isSavedActive,
  onSelectSaved,
  savedLabel,
}: CategoryChipsProps) => {
  return (
    <View style={styles.container}>
      <AnimatedChip
        onPress={onSelectSaved}
        style={[
          styles.savedChip,
          isSavedActive ? styles.savedChipActive : styles.savedChipInactive,
        ]}
      >
        <Text
          variant="bodySmall"
          colorType={isSavedActive ? 'inverse' : 'main'}
        >
          {savedLabel}
        </Text>
      </AnimatedChip>

      {categories.length > 0 && <View style={styles.divider} />}

      <FlatList
        horizontal
        data={categories}
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
        style={styles.list}
        renderItem={({ item }) => {
          const isActive = item === activeCategory;

          styles.useVariants({ status: isActive ? 'active' : 'inactive' });

          return (
            <AnimatedChip onPress={() => onSelect(item)} style={styles.chip}>
              <Text
                variant="bodySmall"
                colorType={isActive ? 'inverse' : 'main'}
              >
                {item}
              </Text>
            </AnimatedChip>
          );
        }}
      />
    </View>
  );
};
