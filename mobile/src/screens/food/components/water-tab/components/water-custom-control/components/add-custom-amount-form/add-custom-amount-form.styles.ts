import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => {
  return {
    animatedWidth: {
      width: '100%',
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.s8,
      height: theme.sizes.inputs.h48,
      width: '100%',
    },
    customTextInput: {
      flex: 1,
      height: '100%',
      borderWidth: theme.borders.sm,
      borderColor: theme.colors.brand.primary,
      borderRadius: theme.radius.md,
      paddingHorizontal: theme.spacing.s16,
      ...theme.typography.bodySmall,
      color: theme.colors.text.main,
      backgroundColor: theme.colors.background.surface,
    },
    submitButton: {
      height: '100%',
      paddingHorizontal: theme.spacing.s24,
      borderRadius: theme.radius.md,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.brand.primary,
    },
    submitButtonText: {
      color: theme.colors.background.surface,
      fontWeight: '600',
    },
    customAmountBtn: {
      marginTop: theme.spacing.s12,
    },
    btnClearMargin: {
      marginTop: theme.spacing.s8,
      marginBottom: 0,
    },
  };
});
