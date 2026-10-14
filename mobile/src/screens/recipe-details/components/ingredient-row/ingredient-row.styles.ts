import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: theme.spacing.s8,
  },
  leader: {
    flex: 1,
    borderBottomWidth: theme.borders.sm,
    borderBottomColor: theme.colors.ui.border,
    borderStyle: 'dotted',
    marginBottom: theme.spacing.s4,
  },
}));
