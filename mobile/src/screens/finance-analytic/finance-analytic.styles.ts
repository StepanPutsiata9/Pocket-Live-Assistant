import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  scroll: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  content: {
    paddingHorizontal: theme.spacing.s16,
    paddingBottom: theme.spacing.s100,
    gap: theme.spacing.s16,
  },
  emptyText: {
    textAlign: 'center',
    paddingVertical: theme.spacing.s32,
  },
}));
