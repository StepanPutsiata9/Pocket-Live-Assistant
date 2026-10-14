import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => {
  return {
    container: {
      overflow: 'hidden',
    },
    newTaskCardContent: {
      flexDirection: 'column',
      gap: theme.spacing.s12,
    },
    formContainer: {
      flexDirection: 'column',
      gap: theme.spacing.s8,
    },
    buttonContainer: {
      width: '100%',
      flexDirection: 'row',
      gap: theme.spacing.s8,
    },
    button: {
      flex: 1,
    },
  };
});
