import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  newTransactionCardContent: {
    gap: theme.spacing.s16,
    padding: theme.spacing.s4,
  },

  formContainer: {
    gap: theme.spacing.s12,
  },

  inputsRow: {
    flexDirection: 'row',
    gap: theme.spacing.s8,
    width: '100%',
    alignItems: 'stretch',
    zIndex: theme.zIndex[1006],
    elevation: theme.elevation[5],
  },

  amountInput: {
    flex: 1.1,
  },

  categoryDropdown: {
    flex: 1.5,
    zIndex: theme.zIndex[1006],
    elevation: theme.elevation[5],
  },

  currencyDropdown: {
    flex: 1.1,
    zIndex: theme.zIndex[1001],
    elevation: theme.elevation[3],
  },

  categoryButtonsContainer: {
    flexDirection: 'row',
    gap: theme.spacing.s4,
  },

  actionButton: {
    width: theme.sizes.button.size,
    height: theme.sizes.button.size,
    paddingHorizontal: theme.spacing.s4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.radius.md,
  },

  addButton: {
    width: '100%',
    marginTop: theme.spacing.s4,
    borderRadius: theme.radius.md,
  },

  dateRow: {
    flexDirection: 'row',
    width: '100%',
    gap: theme.spacing.s8,
  },

  dateButton: {
    flex: 1.7,
    borderRadius: theme.radius.md,
  },

  transactionType: {
    zIndex: theme.zIndex[1009],
    elevation: theme.elevation[10],
  },

  headerContainer: {
    width: '100%',
  },

  cardTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.main,
    marginVertical: theme.spacing.s12,
  },
  error: {
    color: theme.colors.status.error,
    marginTop: theme.spacing.s10,
    textAlign: 'center',
  },
  categoryRow: {
    flexDirection: 'row',
    gap: theme.spacing.s10,
  },
}));
