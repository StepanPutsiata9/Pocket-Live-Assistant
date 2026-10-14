import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create((theme, rt) => {
  return {
    container: {
      flex: 1,
      backgroundColor: theme.colors.background.main,
      paddingTop: rt.insets.top,
    },
  };
});
