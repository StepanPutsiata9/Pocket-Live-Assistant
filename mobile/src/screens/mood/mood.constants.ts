import { Dimensions } from 'react-native';

export const MOOD_ICONS = [
  'thunderstorm-outline',
  'cloud-outline',
  'partly-sunny-outline',
  'sunny-outline',
  'star-outline',
  'heart-outline',
  'rocket-outline',
] as const;

export const MOOD_KEYS = [
  'awful',
  'bad',
  'meh',
  'okay',
  'good',
  'great',
  'amazing',
] as const;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const KNOB_SIZE = 48;
export const SLIDER_WIDTH = SCREEN_WIDTH - 48;
export const MAX_TRANSLATE_X = SLIDER_WIDTH - KNOB_SIZE;
export const MOOD_COUNT = 7;

export const MOOD_COLORS = [
  '#5B6EAE',
  '#6B8FBF',
  '#7BAFC4',
  '#5BAD8F',
  '#4CAF7D',
  '#F5A623',
  '#FF6B6B',
] as const;
