import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    borderRadius: theme.radius.lg,
    width: '100%',
    backgroundColor: theme.colors.background.surface,
    padding: theme.spacing.s16,
  },
}));
