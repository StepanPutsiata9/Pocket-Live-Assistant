import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    marginTop: theme.spacing.s16,
    marginHorizontal: theme.spacing.s16,
    gap: theme.spacing.s16,
  },
  list: {
    flex: 1,
  },
  listContent: {
    gap: theme.spacing.s12,
    paddingBottom: theme.spacing.s24,
    flexGrow: 1,
  },
  stateContainer: {
    paddingTop: theme.spacing.s40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: theme.sizes.icon.md,
    color: theme.colors.ui.icon,
  },
}));
