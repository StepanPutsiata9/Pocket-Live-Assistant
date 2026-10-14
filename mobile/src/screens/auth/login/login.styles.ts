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
    marginBottom: theme.spacing.s32,
    textAlign: 'center',
    paddingBottom: theme.spacing.s4,
  },
  inputContainer: {
    gap: theme.spacing.s16,
    marginBottom: theme.spacing.s24,
    overflow: 'visible',
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
    marginBottom: theme.spacing.s8,
  },
}));
