import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  overlay: {
    flex: 1,
    backgroundColor: theme.colors.withOpacity.surface,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.s24,
  },
  modalCard: {
    width: '100%',
    backgroundColor: theme.colors.background.main,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.s24,
    gap: theme.spacing.s16,
    elevation: theme.elevation[5],
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: theme.spacing.s12,
    marginTop: theme.spacing.s8,
  },
  flexButton: {
    flex: 1,
  },
  destrButton: {
    backgroundColor: theme.colors.status.error,
    borderColor: theme.colors.status.error,
  },
}));
