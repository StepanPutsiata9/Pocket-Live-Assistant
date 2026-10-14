import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => {
  return {
    container: {
      overflow: 'hidden',
    },
    cardTitle: {
      marginBottom: theme.spacing.s16,
    },
    foodNameInput: {
      marginTop: theme.spacing.s12,
    },
    buttonsRow: {
      flexDirection: 'row',
      marginTop: theme.spacing.s16,
    },
    hideMacrosBtn: {
      flex: 1,
      marginRight: theme.spacing.s8,
    },
    addMealBtn: {
      flex: 1,
    },
  };
});
