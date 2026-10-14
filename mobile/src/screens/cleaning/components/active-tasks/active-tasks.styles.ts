import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => {
  return {
    sectionHeader: {
      backgroundColor: theme.colors.background.surface,
      paddingVertical: theme.spacing.s12,
    },
    sectionHeaderText: {
      ...theme.typography.h3,
      color: theme.colors.text.secondary,
    },
    emptyText: {
      textAlign: 'center',
      paddingVertical: theme.spacing.s24,
    },
  };
});
