import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(() => {
  return {
    item: {
      width: 26,
      height: 26,
      borderRadius: 13,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 4,
      borderWidth: 2,
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
});
