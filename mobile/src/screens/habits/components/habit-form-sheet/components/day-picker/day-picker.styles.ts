import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  card: {
    paddingVertical: theme.spacing.s16,
    paddingHorizontal: theme.spacing.s0,
  },

  title: {
    paddingHorizontal: theme.spacing.s16,
    marginBottom: theme.spacing.s12,
  },

  scrollContent: {
    paddingHorizontal: theme.spacing.s16,
    gap: theme.spacing.s8,
    alignItems: 'center',
  },
}));
