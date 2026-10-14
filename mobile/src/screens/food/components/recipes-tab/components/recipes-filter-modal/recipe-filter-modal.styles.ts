import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create((theme, rt) => ({
  overlay: {
    flex: 1,
    backgroundColor: theme.colors.withOpacity.surface,
    justifyContent: 'flex-end',
  },
  modalCard: {
    width: '100%',
    maxHeight: '80%',
    backgroundColor: theme.colors.background.main,
    borderTopLeftRadius: theme.radius.xl,
    borderTopRightRadius: theme.radius.xl,
    padding: theme.spacing.s24,
    paddingBottom: theme.spacing.s24 + rt.insets.bottom,
    gap: theme.spacing.s16,
    elevation: theme.elevation[5],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: theme.sizes.icon.md,
    color: theme.colors.ui.icon,
  },
  body: {
    flexShrink: 1,
  },
  bodyContent: {
    gap: theme.spacing.s16,
  },
  section: {
    gap: theme.spacing.s8,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.s8,
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
  buttonsRow: {
    flexDirection: 'row',
    gap: theme.spacing.s12,
    marginTop: theme.spacing.s8,
  },
  flexButton: {
    flex: 1,
  },
}));
