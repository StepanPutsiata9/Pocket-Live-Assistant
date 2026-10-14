import { Image, View } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';

import { useAvatarCard } from './avatar-card.hook';
import { styles } from './avatar-card.styles';

export const AvatarCard = () => {
  const {
    handleDeleteAvatar,
    t,
    avatarUri,
    handlePickFromCamera,
    handlePickFromGallery,
    user,
  } = useAvatarCard();
  const { theme } = useUnistyles();

  return (
    <Card>
      <View style={styles.avatarCard}>
        <View style={styles.avatarWrapper}>
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
          ) : (
            <Ionicons
              name="person-outline"
              size={theme.sizes.avatar.md}
              color={theme.colors.text.secondary}
            />
          )}
        </View>

        <Text variant="h2" colorType="main">
          {user}
        </Text>

        <View style={styles.avatarButtons}>
          <Button
            title={t('Settings.avatarSourceCamera')}
            variant="outline"
            style={styles.avatarBtn}
            onPress={handlePickFromCamera}
          />
          <Button
            title={t('Settings.avatarSourceGallery')}
            variant="outline"
            style={styles.avatarBtn}
            onPress={handlePickFromGallery}
          />
          <Button
            title={t('Settings.deleteAvatar')}
            variant="outline"
            style={styles.avatarBtn}
            onPress={handleDeleteAvatar}
          />
        </View>
      </View>
    </Card>
  );
};
