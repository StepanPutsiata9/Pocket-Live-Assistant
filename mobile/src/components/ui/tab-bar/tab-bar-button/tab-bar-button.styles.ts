import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  pressable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    variants: {
      colorState: {
        idle: {
          color: theme.colors.simple.grey,
        },
        focused: {
          color: theme.colors.text.main,
        },
        underBackground: {
          color: theme.colors.simple.white,
        },
      },
    },
  },
}));
