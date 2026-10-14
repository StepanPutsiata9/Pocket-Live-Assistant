import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { UnistylesRuntime, useUnistyles } from 'react-native-unistyles';

import { useAuth } from '@/screens/auth';
import { useLanguageStore, useSettingsStore } from '@/store/settings';

export const useSettingsScreen = () => {
  const { signOut, user } = useAuth();
  const { rt } = useUnistyles();
  const { t } = useTranslation(undefined, { bindI18n: false });
  const navigation = useNavigation();

  const avatarUri = useSettingsStore(state => state.avatarUri);
  const setAvatarUri = useSettingsStore(state => state.setAvatarUri);
  const { language, setLanguage } = useLanguageStore();
  const [modalConfig, setModalConfig] = useState<{
    visible: boolean;
    title: string;
    description: string;
    confirmText: string;
    onConfirm: () => void;
  }>({
    visible: false,
    title: '',
    description: '',
    confirmText: '',
    onConfirm: () => {},
  });

  const closeModal = () =>
    setModalConfig(prev => ({ ...prev, visible: false }));

  const handleDeleteAvatar = () => {
    if (!avatarUri) return;

    setModalConfig({
      visible: true,
      title: t('Settings.deleteAvatarAlertTitle'),
      description: t('Settings.deleteAvatarAlertMessage'),
      confirmText: t('Settings.deleteAvatarAlertConfirm'),
      onConfirm: () => setAvatarUri(null),
    });
  };

  const handleLogout = () => {
    setModalConfig({
      visible: true,
      title: t('Settings.logoutAlertTitle'),
      description: t('Settings.logoutAlertMessage'),
      confirmText: t('Settings.logout'),
      onConfirm: signOut,
    });
  };
  const isDarkTheme = rt.themeName === 'dark';

  const toggleTheme = () => {
    const next = isDarkTheme ? 'light' : 'dark';
    UnistylesRuntime.setTheme(next);
    useSettingsStore.getState().setTheme(next);
  };

  const handlePickFromCamera = async () => {
    const result = await launchCamera({ mediaType: 'photo' });
    const uri = result.assets?.[0]?.uri;
    if (uri) setAvatarUri(uri);
  };

  const handlePickFromGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });
    const uri = result.assets?.[0]?.uri;
    if (uri) setAvatarUri(uri);
  };

  const handleLanguageChange = (lang: 'en' | 'ru') => {
    if (lang === language) return;
    setLanguage(lang);
  };

  return {
    t,
    isDarkTheme,
    toggleTheme,
    avatarUri,
    handlePickFromCamera,
    handlePickFromGallery,
    handleDeleteAvatar,
    currentLanguage: language,
    handleLogout,
    modalConfig,
    closeModal,
    handleLanguageChange,
    goBack: () => navigation.goBack(),
    user: user?.email || t('Settings.defaultUsername'),
  };
};
