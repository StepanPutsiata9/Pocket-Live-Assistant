import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  widgetWrapper: {
    flex: 1,
  },
  widgetPressable: {
    flex: 1,
  },
  widgetPressed: {
    opacity: theme.borders.md,
  },
  metricCardInner: {
    flex: 1,
    justifyContent: 'space-between',
  },
  icon: {
    fontSize: theme.sizes.icon.lg,
    color: theme.colors.text.inverse,
  },
  metricLabel: {
    opacity: theme.opacity.lg,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: theme.spacing.s4,
  },
  unit: {
    opacity: theme.opacity.lg,
  },
}));
