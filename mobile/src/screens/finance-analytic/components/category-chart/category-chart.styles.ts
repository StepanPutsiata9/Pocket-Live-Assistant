import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  sectionCard: {
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.background.surface,
    padding: theme.spacing.s16,
    gap: theme.spacing.s16,
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s16,
  },

  centerLabel: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  legend: {
    flex: 1,
    gap: theme.spacing.s12,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s8,
  },
  legendDot: {
    width: theme.sizes.dot.md,
    height: theme.sizes.dot.md,
    borderRadius: theme.radius.full,
  },
  legendInfo: {
    flex: 1,
    gap: theme.spacing.s2,
  },
  legendLabel: {
    textTransform: 'capitalize' as const,
  },
  legendPct: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    fontWeight: '400',
  },
}));
