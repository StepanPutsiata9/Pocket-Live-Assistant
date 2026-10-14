import { Gesture } from 'react-native-gesture-handler';
import {
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {
  KNOB_SIZE,
  MAX_TRANSLATE_X,
  MOOD_COUNT,
} from '@/screens/mood/mood.constants';
import { SNAP_POINTS } from '@/screens/mood/mood.hook';

type Props = {
  translateX: SharedValue<number>;
  setMoodIndex: (idx: number) => void;
};

export const useMoodSlider = ({ translateX, setMoodIndex }: Props) => {
  const context = useSharedValue(0);
  const prevIndexSV = useSharedValue(0);
  const panGesture = Gesture.Pan()
    .onStart(() => {
      context.value = translateX.value;
    })
    .onUpdate(event => {
      translateX.value = Math.max(
        0,
        Math.min(context.value + event.translationX, MAX_TRANSLATE_X),
      );
      const idx = Math.max(
        0,
        Math.min(
          Math.round((translateX.value / MAX_TRANSLATE_X) * (MOOD_COUNT - 1)),
          MOOD_COUNT - 1,
        ),
      );
      if (idx !== prevIndexSV.value) {
        prevIndexSV.value = idx;
        runOnJS(setMoodIndex)(idx);
      }
    })
    .onEnd(() => {
      'worklet';
      const clampedIdx = prevIndexSV.value;
      translateX.value = withSpring(
        (clampedIdx / (MOOD_COUNT - 1)) * MAX_TRANSLATE_X,
        { damping: 18, stiffness: 140 },
      );
    });

  const animatedKnob = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const animatedFill = useAnimatedStyle(() => ({
    width: translateX.value + KNOB_SIZE,
  }));
  return {
    snapPoints: SNAP_POINTS,
    panGesture,
    animatedKnob,
    animatedFill,
  };
};
