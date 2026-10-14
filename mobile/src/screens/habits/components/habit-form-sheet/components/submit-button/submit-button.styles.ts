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
    borderColor: theme.colors.brand.primary,
    backgroundColor: theme.colors.brand.primary,
    width: '100%',
  },
  disabled: {
    opacity: theme.opacity.lg,
  },
}));
