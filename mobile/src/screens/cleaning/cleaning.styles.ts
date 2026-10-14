import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create((theme, runtime) => ({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.s16,
    paddingBottom: runtime.insets.bottom,
  },
  content: {
    gap: theme.spacing.s16,
    paddingBottom: runtime.insets.bottom + theme.spacing.s40,
  },
}));
