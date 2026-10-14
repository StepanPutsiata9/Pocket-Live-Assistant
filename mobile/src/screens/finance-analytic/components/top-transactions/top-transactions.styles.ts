import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  sectionCard: {
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.background.surface,
    padding: theme.spacing.s16,
    gap: theme.spacing.s16,
  },
  container: {
    paddingVertical: theme.spacing.s12,
    borderBottomWidth: theme.borders.sm,
    borderBottomColor: theme.colors.text.placeholder,
  },
  listContent: {
    gap: theme.spacing.s12,
  },
}));
