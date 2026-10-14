import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => {
  return {
    categoryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: theme.spacing.s12,
    },
    categoryBtn: {
      flex: 1,
      paddingVertical: theme.spacing.s8,
      marginHorizontal: theme.spacing.s4,
      borderRadius: theme.radius.sm,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: theme.borders.sm,
      borderColor: theme.colors.ui.disabled,
    },
    categoryBtnActive: {
      backgroundColor: theme.colors.brand.primary,
      borderColor: theme.colors.brand.primary,
    },
    categoryTextActive: {
      color: theme.colors.text.inverse,
      fontWeight: '600',
    },
  };
});
