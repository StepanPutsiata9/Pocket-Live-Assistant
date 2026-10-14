import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  scrollContent: {
    paddingTop: theme.spacing.s16,
    paddingBottom: theme.spacing.s100,
  },
  flatlistContent: {
    paddingHorizontal: theme.spacing.s16,
    gap: theme.spacing.s12,
    alignItems: 'center',
  },
  transactionsRow: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.s16,
    gap: theme.spacing.s12,
    alignItems: 'center',
  },
  loaderBlock: {
    paddingVertical: theme.spacing.s40,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
