import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    aspectRatio: 1,
    height: theme.sizes.container.h44,
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: theme.radius.md,

    borderWidth: theme.borders.sm,
    borderColor: theme.colors.ui.border,
    backgroundColor: theme.colors.background.surface,
  },

  selectedContainer: {
    backgroundColor: theme.colors.brand.primary,
    borderColor: theme.colors.brand.primary,
  },

  text: {
    color: theme.colors.text.main,
  },

  selectedText: {
    color: theme.colors.simple.white,
  },
}));
