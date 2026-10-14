import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Text } from '@/components/ui/text';
import { useActiveTranslation } from '@/hooks';
import { MOOD_COUNT, MOOD_KEYS } from '@/screens/mood/mood.constants';

import { styles } from './mood-display.styles';

type Props = {
  moodIndex: number;
  mood: (typeof MOOD_KEYS)[number];
  icon: string;
};

export const MoodDisplay = ({ moodIndex, mood, icon }: Props) => {
  const { t } = useActiveTranslation();
  return (
    <View style={styles.moodDisplay}>
      <View style={styles.iconRing}>
        <View>
          <Ionicons name={icon || ''} size={140} color="#FFFFFF" />
        </View>
      </View>

      <View style={styles.moodTextBlock}>
        <Text variant="h2" style={styles.moodLabel}>
          {t(`Mood.moods.${mood}`)}
        </Text>
        <Text variant="caption" style={styles.moodStep}>
          {moodIndex + 1} / {MOOD_COUNT}
        </Text>
      </View>
    </View>
  );
};
