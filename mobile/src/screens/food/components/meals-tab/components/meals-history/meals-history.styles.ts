import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => {
  return {
    historyCard: { marginBottom: theme.spacing.s16 },
    historyHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.s16,
    },
    historyTitleText: {
      ...theme.typography.h3,
      color: theme.colors.text.main,
      marginBottom: 0,
    },
    historyList: {
      marginTop: theme.spacing.s2,
    },
    historyItem: {
      paddingVertical: theme.spacing.s12,
      borderBottomWidth: theme.borders.sm,
      borderBottomColor: theme.colors.ui.disabled,
    },
    historyRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: theme.spacing.s2,
    },
    historyName: {
      fontWeight: '500',
    },
    historyCalories: {
      fontWeight: '600',
    },
    historyMacros: {
      fontWeight: '500',
    },
    trashIcon: {
      fontSize: theme.typography.h3.fontSize,
      color: theme.colors.text.main,
    },
    emptyText: {
      textAlign: 'center',
      marginVertical: theme.spacing.s24,
    },
  };
});
