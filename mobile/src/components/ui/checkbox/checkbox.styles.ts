import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    width: theme.sizes.checkbox.size,
    height: theme.sizes.checkbox.size,
    borderColor: theme.colors.ui.border,
    borderWidth: theme.borders.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.xs,
    overflow: 'hidden',
    variants: {
      isChecked: {
        true: {
          borderColor: theme.colors.brand.primary,
        },
        false: {
          borderColor: theme.colors.ui.border,
        },
      },
    },
  },
  fill: {
    position: 'absolute',
    top: -theme.borders.md,
    left: -theme.borders.md,
    right: -theme.borders.md,
    bottom: -theme.borders.md,
    backgroundColor: theme.colors.brand.primary,
  },
  icon: {
    fontSize: theme.sizes.icon.md,
    color: theme.colors.text.inverse,
  },
}));
