import { Modal, Pressable, ScrollView, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useActiveTranslation } from '@/hooks';

import { useRecipesFilter } from './recipe-filter-modal.hook';
import { styles } from './recipe-filter-modal.styles';
import type {
  RecipeFilterType,
  RecipesFilterModalProps,
} from './recipe-filter-modal.types';

export const RecipesFilterModal = ({
  visible,
  onClose,
  categories,
  areas,
  activeFilter,
  onApply,
}: RecipesFilterModalProps) => {
  const { t } = useActiveTranslation();
  const { isSelected, selectFilter, resetFilter, applyFilter } =
    useRecipesFilter(visible, activeFilter, onApply);

  const renderChips = (type: RecipeFilterType, items: string[]) => (
    <View style={styles.chipsWrap}>
      {items.map(item => {
        const isActive = isSelected(type, item);

        styles.useVariants({ status: isActive ? 'active' : 'inactive' });

        return (
          <Pressable
            key={item}
            style={styles.chip}
            onPress={() => selectFilter(type, item)}
          >
            <Text variant="bodySmall" colorType={isActive ? 'inverse' : 'main'}>
              {item}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modalCard}>
          <View style={styles.header}>
            <Text variant="h3" colorType="main">
              {t('Food.recipes.filter.title')}
            </Text>
            <Pressable onPress={onClose} hitSlop={8}>
              <Ionicons name="close-outline" style={styles.closeIcon} />
            </Pressable>
          </View>

          <ScrollView
            style={styles.body}
            contentContainerStyle={styles.bodyContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.section}>
              <Text variant="bodySmall" colorType="secondary">
                {t('Food.recipes.filter.area')}
              </Text>
              {renderChips('area', areas)}
            </View>

            <View style={styles.section}>
              <Text variant="bodySmall" colorType="secondary">
                {t('Food.recipes.filter.category')}
              </Text>
              {renderChips('category', categories)}
            </View>
          </ScrollView>

          <View style={styles.buttonsRow}>
            <Button
              title={t('Food.recipes.filter.reset')}
              variant="outline"
              onPress={resetFilter}
              style={styles.flexButton}
            />
            <Button
              title={t('Food.recipes.filter.apply')}
              onPress={applyFilter}
              style={styles.flexButton}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
