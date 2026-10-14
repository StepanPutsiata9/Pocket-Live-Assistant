import { useActiveTranslation } from '@/hooks';
import { useAuth } from '@/screens/auth';

import { useConfirmationModal } from '../сonfirmation-modal/confirmation-modal.hook';

export const useLogoutButton = () => {
  const { signOut } = useAuth();
  const { t } = useActiveTranslation();
  const { openModal } = useConfirmationModal();

  return {
    t,
    handleLogout: () =>
      openModal({
        title: t('Settings.logoutAlertTitle'),
        description: t('Settings.logoutAlertMessage'),
        confirmText: t('Settings.logout'),
        onConfirm: signOut,
      }),
  };
};
