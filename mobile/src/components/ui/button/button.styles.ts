import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    width: '100%',
    borderRadius: theme.radius.md,
    minHeight: theme.sizes.button.height,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.s24,
    flexDirection: 'row',
    variants: {
      variant: {
        primary: {
          backgroundColor: theme.colors.brand.primary,
          borderWidth: theme.borders.sm,
          borderColor: theme.colors.brand.primary,
        },
        outline: {
          backgroundColor: 'transparent',
          borderWidth: theme.borders.sm,
          borderColor: theme.colors.ui.border,
        },
      },
      disabled: {
        true: {
          opacity: theme.opacity.lg,
        },
      },
    },
  },
  text: {
    textAlign: 'center',
    variants: {
      variant: {
        primary: {
          color: theme.colors.text.inverse,
        },
        outline: {
          color: theme.colors.text.main,
        },
        delete: {
          color: theme.colors.text.inverse,
        },
      },
    },
  },
  loader: {
    variants: {
      variant: {
        primary: {
          color: theme.colors.text.inverse,
        },
        outline: {
          color: theme.colors.brand.primary,
        },
      },
    },
  },
}));
