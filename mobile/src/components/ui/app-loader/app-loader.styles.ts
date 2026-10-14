import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.brand.primary,
  },
  loader: {
    width: theme.sizes.loader.w225,
    height: theme.sizes.loader.h225,
  },
}));
