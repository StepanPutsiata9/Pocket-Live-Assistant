import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    gap: theme.spacing.s12,
    marginBottom: theme.spacing.s12,
  },
  sectionLabel: {
    paddingHorizontal: theme.spacing.s4,
  },

  langButton: {
    width: '100%',
    paddingVertical: theme.spacing.s12,
    paddingHorizontal: theme.spacing.s16,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.background.surface,
    borderWidth: theme.borders.sm,
    borderColor: theme.colors.ui.border,
    variants: {
      isActive: {
        true: {
          borderColor: theme.colors.brand.primary,
          borderWidth: theme.borders.md,
        },
      },
    },
  },
  langButtonPressed: {
    opacity: theme.opacity.md,
  },
}));
