import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => {
  return {
    macrosContainer: {
      marginTop: theme.spacing.s12,
      gap: theme.spacing.s12,
      overflow: 'hidden',
    },
    macrosRow: {
      flexDirection: 'row',
      gap: theme.spacing.s8,
    },
    macroInput: {
      flex: 1,
    },
  };
});
