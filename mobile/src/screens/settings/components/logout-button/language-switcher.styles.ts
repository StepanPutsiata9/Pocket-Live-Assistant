import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.s8,
    paddingVertical: theme.spacing.s12,
    paddingHorizontal: theme.spacing.s24,
    borderRadius: theme.radius.md,
    borderWidth: theme.borders.lg,
    borderColor: theme.colors.withOpacity.error,
    backgroundColor: theme.colors.withOpacity.main,
    width: '100%',
  },
}));
