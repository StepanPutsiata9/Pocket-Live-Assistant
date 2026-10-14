import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  tabBarContainer: {
    flexDirection: 'row',
    position: 'relative',
    backgroundColor: theme.colors.background.surface,
    marginHorizontal: theme.spacing.s16,
    marginVertical: theme.spacing.s16,
    borderRadius: theme.radius.md,
    padding: theme.spacing.s4,
    alignItems: 'center',
    shadowColor: theme.colors.ui.disabled,
    shadowOffset: {
      width: theme.sizes.shadowOffset.w0,
      height: theme.sizes.shadowOffset.h0,
    },
    shadowOpacity: theme.opacity.xxs,
    shadowRadius: theme.radius.sm,
    elevation: theme.elevation[4],
  },
  tabButton: {
    flex: 1,
    paddingVertical: theme.spacing.s12,
    alignItems: 'center',
    borderRadius: theme.radius.md,
    zIndex: 1,
  },
  activeTabSlider: {
    position: 'absolute',
    top: theme.spacing.s4,
    bottom: theme.spacing.s4,
    left: theme.spacing.s4,
    backgroundColor: theme.colors.brand.primary,
    borderRadius: theme.radius.md,
  },
  activeTabButtonText: {
    color: theme.colors.background.surface,
    fontWeight: '600',
    opacity: theme.opacity.solid,
  },
}));
