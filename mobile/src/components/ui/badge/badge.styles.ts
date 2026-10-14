import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    paddingVertical: theme.spacing.s4,
    paddingHorizontal: theme.spacing.s8,
    borderRadius: theme.radius.full,
    variants: {
      variant: {
        violet: { backgroundColor: theme.colors.accents.accent1 },
        orange: { backgroundColor: theme.colors.accents.accent2 },
        pink: { backgroundColor: theme.colors.accents.accent3 },
        green: { backgroundColor: theme.colors.accents.accent4 },
        neutral: { backgroundColor: theme.colors.ui.divider },
      },
    },
  },
  text: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.inverse,
  },
}));
