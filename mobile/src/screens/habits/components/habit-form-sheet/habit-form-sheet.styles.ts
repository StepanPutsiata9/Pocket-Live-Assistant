import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  bottomSheetContent: {
    gap: theme.spacing.s16,
    paddingBottom: theme.spacing.s100,
  },
  handleIndicator: {
    width: theme.sizes.handleIndicator.lg,
  },
  wheelPickersCard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.s16,
  },
}));
