import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create((theme, rt) => ({
  tabBar: {
    position: 'absolute',
    bottom: rt.insets.bottom,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.background.surface,
    width: '90%',
    marginLeft: '5%',
    paddingVertical: theme.spacing.s24,
    borderRadius: theme.radius.xxl,

    shadowColor: theme.colors.background.modal,
    shadowOffset: {
      width: theme.sizes.shadowOffset.w0,
      height: theme.sizes.shadowOffset.h10,
    },
    shadowRadius: theme.radius.lg,
    shadowOpacity: theme.opacity.xxs,
    elevation: theme.elevation[5],
  },
  animatedBackground: {
    position: 'absolute',
    borderRadius: theme.radius.xl,
    marginHorizontal: theme.spacing.s12,
  },
}));
