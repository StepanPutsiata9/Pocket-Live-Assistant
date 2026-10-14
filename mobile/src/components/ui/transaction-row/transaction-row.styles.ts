import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s12,
    minWidth: theme.sizes.container.w240,
  },

  iconWrapper: {
    width: theme.sizes.button.size,
    height: theme.sizes.button.size,
    borderRadius: theme.radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: theme.borders.md,
    variants: {
      type: {
        income: {
          borderColor: theme.colors.withOpacity.income,
        },
        expense: {
          borderColor: theme.colors.withOpacity.expense,
        },
      },
    },
  },

  icon: {
    ...theme.typography.bodySmall,

    variants: {
      type: {
        income: {
          color: theme.chartColors.income,
        },
        expense: {
          color: theme.chartColors.expense,
        },
      },
    },
  },

  infoContainer: {
    gap: theme.spacing.s2,
    flex: 1,
  },

  categoryText: {
    textTransform: 'capitalize',
  },

  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s8,
  },

  amountText: {
    variants: {
      type: {
        income: {
          color: theme.colors.accents.accent5,
        },
        expense: {
          color: theme.colors.status.error,
        },
      },
    },
  },

  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.s4,
    borderRadius: theme.radius.sm,
  },

  deleteIcon: {
    ...theme.typography.h3,
    color: theme.colors.text.secondary,
  },
  deleteActionContainer: {
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  deleteActionText: {
    color: '#FFFFFF',
    marginTop: 4,
    fontWeight: '600',
  },
  deleteActionIcon: {
    color: '#FFFFFF',
    fontSize: 20,
  },
}));
