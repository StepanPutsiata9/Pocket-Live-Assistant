import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  avatarCard: {
    alignItems: 'center',
    gap: theme.spacing.s16,
    padding: theme.spacing.s24,
  },
  avatarWrapper: {
    width: theme.sizes.avatar.lr,
    height: theme.sizes.avatar.lr,
    borderRadius: theme.radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: theme.colors.background.main,
    borderWidth: theme.borders.md,
    borderColor: theme.colors.brand.primary,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },

  avatarButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.s12,
  },
  avatarBtn: {
    width: '100%',
  },
}));
