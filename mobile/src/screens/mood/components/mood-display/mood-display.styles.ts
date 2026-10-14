import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  moodDisplay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.s24,
  },
  iconRing: {
    width: 200,
    height: 200,
    borderRadius: theme.radius.full,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moodTextBlock: {
    alignItems: 'center',
    gap: theme.spacing.s4,
  },
  moodLabel: {
    color: theme.colors.simple.white,
  },
  moodStep: {
    color: 'rgba(255,255,255,0.55)',
  },
}));
