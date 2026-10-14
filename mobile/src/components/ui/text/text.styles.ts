import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  text: {
    variants: {
      variant: {
        h1: theme.typography.h1,
        h2: theme.typography.h2,
        h3: theme.typography.h3,
        body: theme.typography.body,
        bodySmall: theme.typography.bodySmall,
        caption: theme.typography.caption,
      },
      colorType: {
        main: { color: theme.colors.text.main },
        secondary: { color: theme.colors.text.secondary },
        placeholder: { color: theme.colors.text.placeholder },
        inverse: { color: theme.colors.text.inverse },
        primary: { color: theme.colors.brand.primary },
        success: { color: theme.colors.status.success },
        error: { color: theme.colors.status.error },
      },
    },
  },
}));
