import { Pressable, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Text } from '@/components/ui/text';
import { useActiveTranslation } from '@/hooks';
import { MOOD_COLORS, MOOD_ICONS, MOOD_KEYS } from '@/screens/mood/mood.constants';
import { MoodEntry } from '@/services/mood';
import { useDeleteMood } from '@/store/mood';

import { styles } from './mood-history-item.styles';

interface MoodHistoryItemProps {
  item: MoodEntry;
}

export const MoodHistoryItem = ({ item }: MoodHistoryItemProps) => {
  const { t } = useActiveTranslation();
  const { mutate: deleteMood } = useDeleteMood();
  const color = MOOD_COLORS[item.moodIndex];
  const icon = MOOD_ICONS[item.moodIndex];
  const moodKey = MOOD_KEYS[item.moodIndex];

  return (
    <View style={[styles.container, { borderLeftColor: color }]}>
      <Ionicons name={icon} style={[styles.icon, { color }]} />
      <View style={styles.content}>
        <Text variant="body" colorType="main">
          {item.date}
        </Text>
        <Text variant="caption" colorType="secondary">
          {t(`Mood.moods.${moodKey}`)}
        </Text>
      </View>
      <Pressable style={styles.deleteButton} onPress={() => deleteMood(item.id)}>
        <Ionicons name="trash-outline" style={styles.deleteIcon} />
      </Pressable>
    </View>
  );
};
