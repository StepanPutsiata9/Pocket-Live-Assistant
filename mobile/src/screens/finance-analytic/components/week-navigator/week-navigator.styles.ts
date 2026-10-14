import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background.surface,
    borderRadius: theme.radius.lg,
    paddingVertical: theme.spacing.s8,
    paddingHorizontal: theme.spacing.s12,
  },
  label: {
    textTransform: 'capitalize',
  },
  arrowDisabled: {
    opacity: theme.opacity.xs,
  },
  navIcon: {
    fontSize: theme.sizes.icon.lg,
    color: theme.colors.brand.primary,
  },
}));
