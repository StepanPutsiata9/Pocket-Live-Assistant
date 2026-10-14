import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create((theme, rt) => ({
  container: {
    aspectRatio: 4 / 3,
    backgroundColor: theme.colors.ui.divider,
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.s16,
  },
  scrim: {
    position: 'absolute',
    left: theme.spacing.s0,
    right: theme.spacing.s0,
    bottom: theme.spacing.s0,
    height: '60%',
  },
  backButton: {
    width: theme.sizes.button.size,
    height: theme.sizes.button.size,
    borderRadius: theme.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.withOpacity.surface,
  },
  favoriteButton: {
    width: theme.sizes.button.size,
    height: theme.sizes.button.size,
    borderRadius: theme.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.withOpacity.surface,
  },
  buttonsRow: {
    marginTop: rt.insets.top,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fallbackIcon: {
    position: 'absolute',
    alignSelf: 'center',
    top: '30%',
    fontSize: theme.sizes.icon.xxl,
    color: theme.colors.ui.icon,
  },
  title: {
    textShadowColor: theme.colors.ui.shadow,
    textShadowOffset: {
      width: theme.sizes.shadowOffset.w0,
      height: theme.sizes.shadowOffset.h2,
    },
    textShadowRadius: theme.radius.xs,
    marginBottom: theme.spacing.s16,
  },
}));
