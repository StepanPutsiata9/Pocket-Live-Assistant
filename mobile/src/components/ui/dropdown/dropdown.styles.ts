import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    zIndex: theme.zIndex[1000],
    position: 'relative',
  },
  inputBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.background.surface,
    borderWidth: theme.borders.sm,
    borderColor: theme.colors.ui.border,
    borderRadius: theme.radius.md,
    padding: theme.spacing.s16,
  },
  icon: {
    fontSize: theme.sizes.icon.md,
    color: theme.colors.ui.icon,
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: theme.colors.background.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.ui.border,
    marginTop: theme.spacing.s4,
    paddingVertical: theme.spacing.s4,
    zIndex: 1001,
    maxHeight: theme.sizes.dropdown.h200,
    overflow: 'hidden',
    transformOrigin: 'top',
  },
  optionRow: (isLast: boolean) => ({
    paddingVertical: theme.spacing.s16,
    marginHorizontal: theme.spacing.s16,
    borderBottomWidth: isLast ? 0 : theme.borders.sm,
    borderBottomColor: theme.colors.ui.border,
  }),
  optionText: (isSelected: boolean) => ({
    color: isSelected ? theme.colors.brand.primary : theme.colors.text.main,
  }),
  scrollContainer: {
    maxHeight: theme.sizes.dropdown.h200,
  },
  scrollContent: {
    flexGrow: 0,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
}));
