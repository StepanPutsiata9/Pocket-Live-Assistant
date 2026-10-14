import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { useActiveTranslation } from '@/hooks';
import { useAuth } from '@/screens/auth';
import { useSettingsStore } from '@/store/settings';

import { useConfirmationModal } from '../сonfirmation-modal/confirmation-modal.hook';

export const useAvatarCard = () => {
  const { user } = useAuth();
  const { t } = useActiveTranslation();
  const avatarUri = useSettingsStore(state => state.avatarUri);
  const setAvatarUri = useSettingsStore(state => state.setAvatarUri);
  const { openModal } = useConfirmationModal();

  const handleDeleteAvatar = () => {
    if (!avatarUri) return;

    openModal({
      title: t('Settings.deleteAvatarAlertTitle'),
      description: t('Settings.deleteAvatarAlertMessage'),
      confirmText: t('Settings.deleteAvatarAlertConfirm'),
      onConfirm: () => setAvatarUri(null),
    });
  };

  const pickAvatar = async (source: 'camera' | 'gallery') => {
    const result =
      source === 'camera'
        ? await launchCamera({ mediaType: 'photo' })
        : await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 });
    const uri = result.assets?.[0]?.uri;
    if (uri) setAvatarUri(uri);
  };

  return {
    avatarUri,
    user: user?.email || t('Settings.defaultUsername'),
    t,
    handleDeleteAvatar,
    handlePickFromCamera: () => pickAvatar('camera'),
    handlePickFromGallery: () => pickAvatar('gallery'),
  };
};
