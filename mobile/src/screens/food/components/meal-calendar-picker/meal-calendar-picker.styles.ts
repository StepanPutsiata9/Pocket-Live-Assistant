import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  calendarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s4,
  },
  calendarDateText: {
    minWidth: theme.sizes.calendar.w70,
    textAlign: 'center',
    variants: {
      isInverse: {
        true: {
          color: theme.colors.text.inverse,
        },
        false: {
          color: theme.colors.text.main,
        },
      },
    },
  },
  calendarIcon: {
    variants: {
      isInverse: {
        true: {
          color: theme.colors.text.inverse,
        },
        false: {
          color: theme.colors.brand.primary,
        },
      },
    },
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: theme.colors.withOpacity.surface,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.s24,
  },
  modalOverlayTouch: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  calendarCard: {
    backgroundColor: theme.colors.background.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.s16,
    width: '100%',
    shadowOffset: {
      width: theme.sizes.shadowOffset.w0,
      height: theme.sizes.shadowOffset.h10,
    },
    elevation: theme.elevation[10],
  },
}));
