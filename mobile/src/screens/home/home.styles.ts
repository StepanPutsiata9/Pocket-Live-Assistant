import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.s24,
    paddingHorizontal: theme.spacing.s16,
  },
  userAvatar: {
    width: theme.sizes.avatar.sm,
    height: theme.sizes.avatar.sm,
    borderRadius: theme.radius.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarWrapper: {
    width: theme.sizes.avatar.md,
    height: theme.sizes.avatar.md,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.background.main,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: theme.borders.md,
    borderColor: theme.colors.brand.primary,
    overflow: 'hidden',
  },
  avatarIcon: {
    fontSize: theme.sizes.icon.md,
    color: theme.colors.text.secondary,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: theme.spacing.s16,
    paddingBottom: theme.spacing.s40,
    gap: theme.spacing.s12,
  },
  columnWrapper: {
    gap: theme.spacing.s12,
  },
  widgetWrapper: {
    flex: 1,
    maxWidth: '31%',
  },
}));
