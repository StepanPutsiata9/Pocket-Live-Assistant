import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    padding: theme.spacing.s16,
  },

  background: {
    backgroundColor: theme.colors.background.main,
  },

  handleIndicator: {
    backgroundColor: theme.colors.text.main,
  },
}));
