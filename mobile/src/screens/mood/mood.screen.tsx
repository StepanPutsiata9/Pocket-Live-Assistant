import { useNavigation } from '@react-navigation/native';
import React from 'react';
import Animated from 'react-native-reanimated';

import { Button } from '@/components/ui/button';
import { Screen } from '@/components/ui/screen';
import { useActiveTranslation } from '@/hooks';
import { useUpsertMood } from '@/store/mood';

import { MoodHeader } from './components';
import { MoodDisplay } from './components/mood-display/mood-display.component';
import { MoodSlider } from './components/mood-slider';
import { useMoodSсreen } from './mood.hook';
import { styles } from './mood.styles';

const AnimatedScreen = Animated.createAnimatedComponent(Screen);

export const MoodScreen = () => {
  const { animatedBg, moodIndex, mood, icon, translateX, setMoodIndex } =
    useMoodSсreen(3);
  const { mutate: upsertMood, isPending } = useUpsertMood();
  const { t } = useActiveTranslation();
  const navigation = useNavigation();

  const handleSave = () => {
    const today = new Date().toISOString().split('T')[0];
    upsertMood(
      { date: today, moodIndex },
      { onSuccess: () => navigation.goBack() },
    );
  };

  return (
    <AnimatedScreen style={[styles.container, animatedBg]}>
      <MoodHeader />
      <MoodDisplay
        moodIndex={moodIndex}
        mood={mood || 'good'}
        icon={icon || ''}
      />
      <MoodSlider
        translateX={translateX}
        setMoodIndex={setMoodIndex}
        icon={icon || ''}
      />
      <Button
        variant="outline"
        title={t('Mood.saveButton')}
        style={styles.saveButton}
        onPress={handleSave}
        disabled={isPending}
      />
    </AnimatedScreen>
  );
};
