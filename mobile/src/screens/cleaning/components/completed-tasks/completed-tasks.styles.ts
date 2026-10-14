import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => {
  return {
    tasksCardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    icon: {
      fontSize: theme.sizes.icon.lg,
      color: theme.colors.ui.icon,
    },
    emptyText: {
      textAlign: 'center',
      paddingVertical: theme.spacing.s24,
    },
  };
});
