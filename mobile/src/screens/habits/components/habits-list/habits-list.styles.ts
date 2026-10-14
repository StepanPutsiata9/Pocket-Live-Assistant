import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  content: {
    paddingBottom: theme.spacing.s100,
    gap: theme.spacing.s12,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    gap: theme.spacing.s12,
  },
  emptyHabitsText: {
    textAlign: 'center',
    marginTop: theme.spacing.s24,
  },
}));
