import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
    paddingHorizontal: theme.spacing.s16,
    overflow: 'visible',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    overflow: 'visible',
    marginHorizontal: theme.spacing.s8,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text.main,
    paddingBottom: theme.spacing.s4,
    marginBottom: theme.spacing.s32,
    textAlign: 'center',
  },
  inputContainer: {
    gap: theme.spacing.s16,
    marginBottom: theme.spacing.s24,
  },
  linkButton: {
    marginTop: theme.spacing.s24,
    alignItems: 'center',
  },
  linkButtonText: {
    ...theme.typography.bodySmall,
    color: theme.colors.brand.primary,
  },
  error: {
    color: theme.colors.status.error,
    marginBottom: theme.spacing.s16,
  },
}));
