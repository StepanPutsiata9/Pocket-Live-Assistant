import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => {
  return {
    dashboardCard: {
      borderRadius: theme.radius.lg,
      padding: theme.spacing.s24,
      marginBottom: theme.spacing.s16,
      shadowColor: theme.colors.ui.disabled,
      shadowOffset: {
        width: theme.sizes.shadowOffset.w0,
        height: theme.sizes.shadowOffset.h2,
      },
      shadowOpacity: theme.opacity.xs,
      shadowRadius: theme.radius.xs,
      elevation: theme.elevation[2],
    },

    dashboardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.s16,
      paddingBottom: theme.spacing.s12,
      borderBottomWidth: theme.borders.sm,
      borderBottomColor: theme.colors.simple.white,
    },

    caloriesContainer: {
      marginBottom: theme.spacing.s16,
    },
    caloriesText: {
      ...theme.typography.bodySmall,
      color: theme.colors.text.secondaryLight,
    },

    progressBarBackground: {
      height: theme.sizes.dot.sm,
      backgroundColor: theme.colors.withOpacity.surface,
      borderRadius: theme.radius.full,
      overflow: 'hidden',
    },
    progressBarFill: {
      height: '100%',
      backgroundColor: theme.colors.simple.white,
      borderRadius: theme.radius.full,
    },
    macroBadge: {
      flex: 1,
      padding: theme.spacing.s8,
      borderRadius: theme.radius.sm,
      alignItems: 'center',
      borderWidth: theme.borders.sm,
      borderColor: theme.colors.simple.white,
    },
    macroLabel: {
      marginBottom: theme.spacing.s2,
    },
    macroValue: {
      fontWeight: '700',
      lineHeight: undefined,
    },
    macrosRow: {
      flexDirection: 'row',
      gap: theme.spacing.s8,
    },
  };
});
