import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => {
  return {
    waterQuickBtn: {
      backgroundColor: theme.colors.withOpacity.primary,
      borderRadius: theme.radius.md,
      paddingVertical: theme.spacing.s16,
      alignItems: 'center',
      flex: 1,
      marginHorizontal: theme.spacing.s4,
    },
  };
});
