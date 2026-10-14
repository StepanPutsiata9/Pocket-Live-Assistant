import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  paddingTop: {
    paddingTop: rt.insets.top,
  },
  paddingBottom: {
    paddingBottom: Math.max(rt.insets.bottom, rt.insets.ime),
  },
}));
