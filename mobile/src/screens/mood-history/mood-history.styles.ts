import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s12,
    paddingHorizontal: theme.spacing.s24,
    paddingBottom: theme.spacing.s16,
  },
  backButton: {
    width: theme.sizes.button.size,
    height: theme.sizes.button.size,
    borderRadius: theme.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: theme.borders.sm,
    borderColor: theme.colors.border.glass,
  },
  backIcon: {
    ...theme.typography.body,
    color: theme.colors.text.main,
  },
  listContent: {
    paddingHorizontal: theme.spacing.s24,
    gap: theme.spacing.s12,
    paddingBottom: theme.spacing.s100,
  },
  deleteButton: {
    marginLeft: 'auto',
    padding: theme.spacing.s8,
  },
  deleteIcon: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
  empty: {
    textAlign: 'center',
    marginTop: theme.spacing.s24,
  },
}));
