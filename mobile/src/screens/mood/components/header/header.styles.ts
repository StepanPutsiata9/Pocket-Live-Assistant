import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s12,
    marginBottom: theme.spacing.s12,
  },
  backButton: {
    width: theme.sizes.button.size,
    height: theme.sizes.button.size,
    borderRadius: theme.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: theme.borders.sm,
    borderColor: theme.colors.simple.white,
  },
  backIcon: {
    ...theme.typography.body,
    color: theme.colors.simple.white,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.simple.white,
  },
  subtitle: {
    color: theme.colors.simple.white,
  },
  animatedBackButton: {
    marginLeft: 'auto',
  },
}));
