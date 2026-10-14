import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  root: {
    width: '100%',
    gap: theme.spacing.s8,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.surface,
    borderWidth: theme.borders.sm,
    borderRadius: theme.radius.md,
    minHeight: theme.sizes.inputs.h52,
    paddingHorizontal: theme.spacing.s16,
    variants: {
      isFocused: {
        true: {
          borderColor: theme.colors.brand.primary,
        },
        false: {
          borderColor: theme.colors.ui.border,
        },
      },
      hasError: {
        true: {
          borderColor: theme.colors.status.error,
        },
      },
      isDisabled: {
        true: {
          backgroundColor: theme.colors.background.main,
          opacity: theme.opacity.lg,
        },
      },
    },
  },
  input: {
    flex: 1,
    ...theme.typography.body,
    color: theme.colors.text.main,
    paddingVertical: theme.spacing.s12,
  },
  leftIconContainer: {
    marginRight: theme.spacing.s12,
  },
  rightIconContainer: {
    marginLeft: theme.spacing.s12,
  },
  errorText: {
    marginTop: -theme.spacing.s4,
  },
  placeholderTextColor: {
    color: theme.colors.text.placeholder,
  },
}));
