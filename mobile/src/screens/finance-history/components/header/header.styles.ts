import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s12,
    paddingHorizontal: theme.spacing.s16,
    paddingBottom: theme.spacing.s8,
  },
  backButton: {
    width: theme.sizes.button.size,
    height: theme.sizes.button.size,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.background.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    ...theme.typography.body,
    color: theme.colors.text.main,
  },
}));
