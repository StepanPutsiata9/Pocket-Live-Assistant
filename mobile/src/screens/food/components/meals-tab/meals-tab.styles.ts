import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create((theme, runtime) => ({
  safeArea: {
    paddingBottom: runtime.insets.bottom,
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: theme.spacing.s16,
    paddingBottom: runtime.insets.bottom + theme.spacing.s40,
  },
}));
