import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => {
  return {
    container: {
      flex: 1,
      minHeight: 0,
      borderRadius: theme.radius.lg,
      padding: theme.spacing.s16,
      gap: theme.spacing.s8,
      justifyContent: 'space-between',
      elevation: theme.elevation['4'],
    },
    weekContainer: {
      gap: theme.spacing.s8,
    },
    daysContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: theme.spacing.s8,
    },
    dayItem: {
      aspectRatio: 1,
      height: theme.sizes.itemStyle.h16,
      borderRadius: theme.radius.xs,
      flexShrink: 1,
    },
    activeDay: {
      backgroundColor: theme.colors.simple.white,
    },
    inactiveDay: {
      backgroundColor: theme.colors.simple.white,
      opacity: theme.opacity.xs,
    },
    button: {
      position: 'absolute',
      top: theme.spacing.s16,
      right: theme.spacing.s16,
      width: theme.sizes.button.lg,
      height: theme.sizes.button.lg,
      borderRadius: theme.radius.full,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 1,
      borderColor: theme.colors.border.glass,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
    },
    habitName: {
      paddingRight: theme.spacing.s32,
      fontWeight: 'bold',
      color: theme.colors.simple.white,
      wordBreak: 'break-all',
    },
    habitNameContainer: {
      minHeight: theme.sizes.container.h44,
    },
    streakContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.s2,
    },
    streakText: {
      color: theme.colors.text.inverse,
      fontSize: theme.typography.bodySmall.fontSize,
    },
    streakAndWeekContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    timesAWeekText: {
      color: theme.colors.simple.white,
    },
    animatedView: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    iconFlameInactive: {
      color: theme.colors.simple.white,
    },
    icon: {
      color: theme.colors.simple.white,
      paddingBottom: theme.spacing.s8,
    },
  };
});
