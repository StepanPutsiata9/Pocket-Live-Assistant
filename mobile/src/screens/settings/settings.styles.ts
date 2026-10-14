import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: theme.spacing.s16,
    gap: theme.spacing.s16,
    paddingBottom: theme.spacing.s100,
  },
}));
