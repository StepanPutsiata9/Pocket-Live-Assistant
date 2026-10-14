import { Keyboard, Modal, TouchableWithoutFeedback, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { useActiveTranslation } from '@/hooks';

import { useCategoryModal } from './add-category-modal.hook';
import { styles } from './add-category-modal.styles';
import { AddCategoryModalProps } from './add-category-modal.types';

export const AddCategoryModal = ({
  visible,
  onClose,
  transactionType,
  onCategoryCreated,
}: AddCategoryModalProps) => {
  const { name, setName, handleCreate } = useCategoryModal(
    onClose,
    transactionType,
    onCategoryCreated,
  );
  const { t } = useActiveTranslation();
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <View style={styles.modalCard}>
            <Text variant="h3" colorType="main">
              {t('Finance.addCategoryTitle')}
            </Text>

            <Input
              placeholder={t('Finance.categoryNamePlaceholder')}
              value={name}
              onChangeText={setName}
            />

            <View style={styles.buttonsRow}>
              <Button
                title={t('Common.cancel')}
                onPress={onClose}
                variant="outline"
                style={styles.flexButton}
              />
              <Button
                title={t('Common.create')}
                onPress={handleCreate}
                disabled={!name.trim()}
                style={styles.flexButton}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
