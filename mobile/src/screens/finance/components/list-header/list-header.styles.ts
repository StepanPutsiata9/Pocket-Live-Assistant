import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  headerContainer: {
    width: '100%',
    paddingHorizontal: theme.spacing.s16,
    zIndex: theme.zIndex[9999],
    elevation: theme.elevation[10],
  },

  cardTitle: {
    marginVertical: theme.spacing.s12,
  },
}));
