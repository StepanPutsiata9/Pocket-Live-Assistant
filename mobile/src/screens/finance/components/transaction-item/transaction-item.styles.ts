import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  itemWrapper: {
    paddingHorizontal: theme.spacing.s16,
  },

  swipeableContainer: {
    overflow: 'visible',
  },

  container: {
    padding: theme.spacing.s16,
    borderWidth: theme.borders.sm,
    borderRadius: theme.radius.xl,
    borderColor: theme.colors.ui.border,
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background.surface,
  },

  deleteAction: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: theme.colors.status.error,
    borderRadius: theme.radius.xl,
    paddingRight: theme.spacing.s24,
  },

  deleteActionIcon: {
    fontSize: theme.sizes.icon.lg,
    color: theme.colors.simple.white,
  },
}));
