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
  iconWrapper: {
    width: theme.sizes.icon.xxl,
    height: theme.sizes.icon.xxl,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.withOpacity.error,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  icon: {
    ...theme.typography.h1,
    color: theme.colors.status.error,
  },
  title: {
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    paddingVertical: theme.spacing.s8,
  },
  list: {
    maxHeight: theme.sizes.maxListHeight,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.s12,
    borderBottomWidth: theme.borders.sm,
    borderBottomColor: theme.colors.ui.divider,
  },
  categoryName: {
    flex: 1,
  },
  deleteButton: {
    padding: theme.spacing.s4,
  },
  deleteIcon: {
    ...theme.typography.h2,
    color: theme.colors.status.error,
  },
  closeButton: {
    width: '100%',
    marginTop: theme.spacing.s4,
  },
}));
