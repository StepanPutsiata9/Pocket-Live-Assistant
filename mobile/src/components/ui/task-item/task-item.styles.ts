import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.s8,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.s12,
    flex: 1,
  },
  checkboxContainer: {
    paddingTop: theme.spacing.s2,
  },
  contentContainer: {
    flex: 1,
    gap: theme.spacing.s8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s4,
  },
  priorityText: {
    textAlign: 'center',
  },
  text: {
    flex: 1,
    variants: {
      isChecked: {
        true: {
          textDecorationLine: 'line-through',
          color: theme.colors.text.secondary,
        },
        false: {
          textDecorationLine: 'none',
        },
      },
    },
  },
  deleteIcon: {
    fontSize: theme.sizes.icon.lg,
    color: theme.colors.text.secondary,
  },
}));
