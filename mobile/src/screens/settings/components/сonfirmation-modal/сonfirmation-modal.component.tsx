import { Modal, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useActiveTranslation } from '@/hooks';

import { useConfirmationModal } from './confirmation-modal.hook';
import { styles } from './сonfirmation-modal.styles';

export const ConfirmationModal = () => {
  const { t } = useActiveTranslation();
  const { closeModal, ...modalConfig } = useConfirmationModal();
  return (
    <Modal
      visible={modalConfig.visible}
      animationType="fade"
      transparent
      onRequestClose={closeModal}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <Text variant="h3" colorType="main">
            {modalConfig.title}
          </Text>

          <Text variant="body" colorType="secondary">
            {modalConfig.description}
          </Text>

          <View style={styles.buttonsRow}>
            <Button
              title={t('Common.cancel')}
              onPress={closeModal}
              variant="outline"
              style={styles.flexButton}
            />
            <Button
              title={modalConfig.confirmText}
              onPress={() => {
                modalConfig.onConfirm();
                closeModal();
              }}
              style={[styles.flexButton, styles.destrButton]}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
