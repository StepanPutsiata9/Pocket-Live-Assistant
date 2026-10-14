import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.s8,
    minHeight: theme.sizes.button.height,
    paddingHorizontal: theme.spacing.s24,
    borderRadius: theme.radius.md,
    borderWidth: theme.borders.lg,
    borderColor: theme.colors.withOpacity.error,
    backgroundColor: theme.colors.status.error,
    width: '100%',
  },

  icon: {
    ...theme.typography.h3,
    color: theme.colors.simple.white,
  },
}));
