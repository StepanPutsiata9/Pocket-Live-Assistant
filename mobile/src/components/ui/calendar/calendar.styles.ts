import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  overlay: {
    flex: 1,
    backgroundColor: theme.colors.withOpacity.surface,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.s24,
  },
  title: {
    marginBottom: theme.spacing.s16,
  },
  card: {
    width: '100%',
    backgroundColor: theme.colors.background.surface,
    borderRadius: theme.radius.xl,
    elevation: theme.elevation[5],
    padding: theme.spacing.s16,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: theme.spacing.s12,
    marginTop: theme.spacing.s8,
  },
  button: {
    flex: 1,
  },
  pickerContainer: {
    marginHorizontal: 'auto',
  },
}));
