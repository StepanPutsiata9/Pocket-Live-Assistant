import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.surface,
  },
  contentContainer: {
    paddingBottom: rt.insets.bottom,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.s16,
    padding: theme.spacing.s24,
    backgroundColor: theme.colors.background.surface,
  },
  section: {
    paddingHorizontal: theme.spacing.s16,
    marginTop: theme.spacing.s24,
    gap: theme.spacing.s12,
  },
  tagRow: {
    flexDirection: 'row',
    gap: theme.spacing.s8,
  },
  tag: {
    borderRadius: theme.radius.full,
  },
  instructions: {
    lineHeight: theme.sizes.line.h24,
  },
}));
