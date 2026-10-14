import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s12,
    padding: theme.spacing.s16,
    borderRadius: theme.radius.md,
    borderLeftWidth: 4,
    backgroundColor: theme.colors.background.surface,
  },
  icon: {
    fontSize: 28,
  },
  content: {
    gap: theme.spacing.s4,
  },
  deleteButton: {
    marginLeft: 'auto',
    padding: theme.spacing.s8,
  },
  deleteIcon: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
}));
