import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.s16,
  },

  content: {
    gap: theme.spacing.s16,
  },

  financeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.s24,
    paddingHorizontal: theme.spacing.s24,
    gap: theme.spacing.s8,
    borderRadius: theme.radius.xl,
    marginBottom: theme.spacing.s16,
  },

  bannerTopRow: {
    justifyContent: 'space-between',
  },

  analyticsButton: {
    width: theme.sizes.icon.xxl,
    height: theme.sizes.icon.xxl,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.withOpacity.income,
    justifyContent: 'center',
    alignItems: 'center',
  },

  analyticsIcon: {
    ...theme.typography.h1,
    color: theme.colors.text.inverse,
  },

  bannerTitleText: {
    opacity: theme.opacity.lg,
  },
}));
