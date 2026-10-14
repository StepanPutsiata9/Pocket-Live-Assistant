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
    borderColor: theme.colors.ui.border,
    borderRadius: theme.radius.md,
    minHeight: theme.sizes.button.height,
    paddingHorizontal: theme.spacing.s16,
    paddingVertical: theme.spacing.s12,
    justifyContent: 'space-between',
    variants: {
      isDisabled: {
        true: {
          backgroundColor: theme.colors.background.main,
          opacity: theme.opacity.md,
        },
      },
    },
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s12,
  },
  textContainer: {
    flex: 1,
    gap: theme.spacing.s2,
  },
}));
