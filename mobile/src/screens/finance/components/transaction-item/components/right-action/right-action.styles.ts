import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
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
