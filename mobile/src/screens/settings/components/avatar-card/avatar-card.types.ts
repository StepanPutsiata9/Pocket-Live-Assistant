import type { useSettingsScreen } from '@/screens/settings/settings.hook';
import type { ThemeMode } from '@/store/settings';

type SettingsScreenData = ReturnType<typeof useSettingsScreen>;

export interface AvatarCardProps {
  onDeleteAvatar: () => void;
  t: SettingsScreenData['t'];
  avatarUri: SettingsScreenData['avatarUri'];
  handlePickFromCamera: SettingsScreenData['handlePickFromCamera'];
  handlePickFromGallery: SettingsScreenData['handlePickFromGallery'];
  user: SettingsScreenData['user'];
  themeMode: ThemeMode;
}
