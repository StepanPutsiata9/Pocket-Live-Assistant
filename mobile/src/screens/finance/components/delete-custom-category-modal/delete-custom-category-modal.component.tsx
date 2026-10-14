import {
  Modal,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useActiveTranslation } from '@/hooks';

import { styles } from './delete-custom-category-modal.styles';
import { DeleteCustomCategoryModalProps } from './delete-custom-category-modal.types';

export const DeleteCustomCategoryModal = ({
  visible,
  customCategories,
  onDelete,
  onClose,
}: DeleteCustomCategoryModalProps) => {
  const { t } = useActiveTranslation();

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalCard}>
              <View style={styles.iconWrapper}>
                <Ionicons name="trash-outline" style={styles.icon} />
              </View>

              <Text variant="h3" colorType="main" style={styles.title}>
                {t('Finance.deleteCategory.title')}
              </Text>

              {customCategories.length === 0 ? (
                <Text
                  variant="body"
                  colorType="secondary"
                  style={styles.emptyText}
                >
                  {t('Finance.deleteCategory.empty')}
                </Text>
              ) : (
                <ScrollView
                  style={styles.list}
                  bounces={false}
                  showsVerticalScrollIndicator={false}
                >
                  {customCategories.map(cat => (
                    <View key={cat.id} style={styles.categoryRow}>
                      <Text
                        variant="body"
                        colorType="main"
                        style={styles.categoryName}
                      >
                        {cat.name}
                      </Text>
                      <Pressable
                        onPress={() => onDelete(cat.id)}
                        style={styles.deleteButton}
                        hitSlop={8}
                      >
                        <Ionicons
                          name="close-circle-outline"
                          style={styles.deleteIcon}
                        />
                      </Pressable>
                    </View>
                  ))}
                </ScrollView>
              )}

              <Button
                title={t('Common.close')}
                onPress={onClose}
                variant="outline"
                style={styles.closeButton}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
