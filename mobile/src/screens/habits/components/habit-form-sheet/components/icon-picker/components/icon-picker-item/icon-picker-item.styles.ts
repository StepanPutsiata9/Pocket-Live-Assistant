import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => {
  return {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },

    icon: {
      color: theme.colors.text.main,
    },
  };
});
