import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s8,
    paddingVertical: theme.spacing.s4,
  },
  savedChip: {
    paddingHorizontal: theme.spacing.s16,
    paddingVertical: theme.spacing.s8,
    borderRadius: theme.radius.full,
    borderWidth: theme.borders.sm,
  },
  savedChipActive: {
    backgroundColor: theme.colors.brand.primary,
    borderColor: theme.colors.brand.primary,
  },
  savedChipInactive: {
    backgroundColor: 'transparent',
    borderColor: theme.colors.ui.border,
  },
  divider: {
    width: theme.borders.sm,
    alignSelf: 'stretch',
    backgroundColor: theme.colors.ui.border,
  },
  list: {
    flex: 1,
  },
  content: {
    gap: theme.spacing.s8,
    alignItems: 'center',
  },
  chip: {
    variants: {
      status: {
        active: {
          backgroundColor: theme.colors.brand.primary,
          borderColor: theme.colors.brand.primary,
        },
        inactive: {
          backgroundColor: 'transparent',
          borderColor: theme.colors.ui.border,
        },
      },
    },
    paddingHorizontal: theme.spacing.s16,
    paddingVertical: theme.spacing.s8,
    borderRadius: theme.radius.full,
    borderWidth: theme.borders.sm,
  },
}));
