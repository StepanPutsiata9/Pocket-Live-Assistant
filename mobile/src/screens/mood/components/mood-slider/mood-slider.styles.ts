import { StyleSheet } from 'react-native-unistyles';

import { KNOB_SIZE } from '@/screens/mood/mood.constants';

export const styles = StyleSheet.create(theme => ({
  sliderSection: {
    paddingBottom: theme.spacing.s40,
    gap: theme.spacing.s12,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: KNOB_SIZE / 2,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: theme.radius.full,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  trackContainer: {
    height: KNOB_SIZE,
    justifyContent: 'center',
  },
  track: {
    position: 'absolute',
    width: '100%',
    height: 4,
    borderRadius: theme.radius.full,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  trackFill: {
    position: 'absolute',
    height: 4,
    borderRadius: theme.radius.full,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  knob: {
    width: KNOB_SIZE,
    height: KNOB_SIZE,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.simple.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.ui.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  labelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelText: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 11,
  },
}));
