import { View } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { SharedValue } from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Text } from '@/components/ui/text';
import { useActiveTranslation } from '@/hooks';
import { SLIDER_WIDTH } from '@/screens/mood/mood.constants';

import { useMoodSlider } from './mood-slider.hook';
import { styles } from './mood-slider.styles';

type Props = {
  translateX: SharedValue<number>;
  setMoodIndex: (idx: number) => void;
  icon: string;
};

export const MoodSlider = ({ translateX, setMoodIndex, icon }: Props) => {
  const { t } = useActiveTranslation();
  const { snapPoints, panGesture, animatedKnob, animatedFill } = useMoodSlider({
    translateX,
    setMoodIndex,
  });
  return (
    <View style={styles.sliderSection}>
      <View style={styles.dotsRow}>
        {snapPoints.map(i => (
          <View key={i} style={styles.dot} />
        ))}
      </View>

      <GestureDetector gesture={panGesture}>
        <View style={[styles.trackContainer, { width: SLIDER_WIDTH }]}>
          <View style={styles.track} />
          <Animated.View style={[styles.trackFill, animatedFill]} />
          <Animated.View style={[styles.knob, animatedKnob]}>
            <Ionicons name={icon || ''} size={22} color="#333" />
          </Animated.View>
        </View>
      </GestureDetector>

      <View style={styles.labelsRow}>
        <Text style={styles.labelText}>{t('Mood.moods.awful')}</Text>
        <Text style={styles.labelText}>{t('Mood.moods.amazing')}</Text>
      </View>
    </View>
  );
};
