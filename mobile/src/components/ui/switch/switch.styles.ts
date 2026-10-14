import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  track: {
    width: theme.sizes.switch.trackWidth,
    height: theme.sizes.switch.trackHeight,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.s2,
    justifyContent: 'center',
    variants: {
      value: {
        true: {
          backgroundColor: theme.colors.brand.primary,
        },
        false: {
          backgroundColor: theme.colors.ui.border,
        },
      },
    },
  },
  thumb: {
    width: theme.sizes.switch.thumbSize,
    height: theme.sizes.switch.thumbSize,
    backgroundColor: theme.colors.background.surface,
    borderRadius: theme.radius.full,
  },
}));
