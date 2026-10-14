import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  successToast: {
    height: theme.sizes.toasts.h60,
    width: '90%',
    backgroundColor: theme.colors.background.surface,
    borderLeftWidth: theme.borders.xl,
    borderLeftColor: theme.colors.status.success,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.s16,
    justifyContent: 'center',
    elevation: theme.elevation[4],
  },
  errorToast: {
    height: theme.sizes.toasts.h60,
    width: '90%',
    backgroundColor: theme.colors.background.surface,
    borderLeftWidth: theme.borders.xl,
    borderLeftColor: theme.colors.status.error,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.s16,
    justifyContent: 'center',
    elevation: theme.elevation[4],
  },
  title: {
    fontWeight: '600',
  },
  subtitle: {
    opacity: theme.opacity.md,
  },
}));
