import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => {
  return {
    waterBanner: {
      borderRadius: theme.radius.lg,
      padding: theme.spacing.s24,
      marginBottom: theme.spacing.s16,
      elevation: theme.elevation[2],
    },
    dateContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.s24,
      paddingBottom: theme.spacing.s12,
      borderBottomWidth: theme.borders.sm,
      borderBottomColor: theme.colors.simple.white,
    },
    bannerTitleWorkaround: {
      color: theme.colors.text.inverse,
      marginBottom: 0,
    },
    waterBannerHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.s24,
    },
    waterTextRight: {
      alignItems: 'flex-end',
    },
    waterVolume: {
      ...theme.typography.h1,
      color: theme.colors.text.inverse,
    },
    waterGoal: {
      color: theme.colors.simple.white,
      opacity: theme.opacity.md,
    },
    waterProgressBg: {
      height: theme.spacing.s4,
      backgroundColor: theme.colors.withOpacity.surface,
      borderRadius: theme.radius.xs,
      overflow: 'hidden',
    },
    waterProgressFill: (progress: number) => ({
      height: '100%',
      backgroundColor: theme.colors.simple.white,
      width: `${progress}%`,
    }),
  };
});
