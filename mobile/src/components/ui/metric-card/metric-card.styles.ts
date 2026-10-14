import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    variants: {
      size: {
        small: {
          padding: theme.spacing.s16,
          aspectRatio: 1,
          borderRadius: theme.radius.xl,
        },
        large: {
          padding: theme.spacing.s24,
          borderRadius: theme.radius.lg,
          width: '100%',
        },
      },
    },
    overflow: 'hidden',
  },
}));
