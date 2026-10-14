import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  text: {
    includeFontPadding: false,
    textAlignVertical: 'center',
  },

  button: {
    width: theme.sizes.button.size,
    height: theme.sizes.button.size,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.background.main,
    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: theme.borders.sm,
    borderColor: theme.colors.border.glass,

    shadowColor: theme.colors.text.main,
    elevation: theme.elevation['10'],
  },
}));
