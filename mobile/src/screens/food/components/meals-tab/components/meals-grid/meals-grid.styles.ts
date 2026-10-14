import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => {
  return {
    mealsGridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: theme.spacing.s12,
      marginBottom: theme.spacing.s16,
      marginTop: theme.spacing.s16,
    },
    gridCard: {
      backgroundColor: theme.colors.background.surface,
      borderRadius: theme.radius.lg,
      width: '48%',
      padding: theme.spacing.s16,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: theme.colors.ui.disabled,
      shadowOffset: {
        width: theme.sizes.shadowOffset.w0,
        height: theme.sizes.shadowOffset.h2,
      },
      shadowOpacity: theme.opacity.xxs,
      shadowRadius: theme.radius.xs,
      elevation: theme.elevation[2],
    },
    gridTextContainer: {
      flex: 1,
      alignItems: 'flex-end',
    },
    gridLabel: {
      opacity: theme.opacity.md,
      marginTop: theme.spacing.s2,
    },
    gridIcon: {
      fontSize: theme.spacing.s24,
      color: theme.colors.text.main,
    },
  };
});
