import { useMoodStore } from '@store/mood';
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import {
  MAX_TRANSLATE_X,
  MOOD_COLORS,
  MOOD_COUNT,
  MOOD_ICONS,
  MOOD_KEYS,
} from './mood.constants';

export const SNAP_POINTS = Array.from(
  { length: MOOD_COUNT },
  (_, i) => i / (MOOD_COUNT - 1),
);

const ALL_COLORS = MOOD_COLORS as unknown as string[];

export const useMoodSсreen = (initialIndex?: number) => {
  const moodIndex = useMoodStore(s => s.moodIndex);
  const setMoodIndex = useMoodStore(s => s.setMoodIndex);

  const startIndex = moodIndex ?? initialIndex;
  const initialTranslateX = (startIndex / (MOOD_COUNT - 1)) * MAX_TRANSLATE_X;
  const translateX = useSharedValue(initialTranslateX);

  const animatedBg = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      translateX.value / MAX_TRANSLATE_X,
      SNAP_POINTS,
      ALL_COLORS,
    ),
  }));

  const mood = MOOD_KEYS[moodIndex];
  const icon = MOOD_ICONS[moodIndex];
  const saveMoodForDate = useMoodStore(s => s.saveMoodForDate);

  const handleSave = () => {
    const today = new Date().toISOString().split('T')[0] || '';
    saveMoodForDate(today, moodIndex);
  };

  return {
    moodIndex,
    setMoodIndex,
    translateX,
    animatedBg,
    icon,
    mood,
    handleSave,
  };
};
