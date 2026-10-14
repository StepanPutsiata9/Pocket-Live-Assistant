import { StyleSheet } from 'react-native-unistyles';

import { ITEM_HEIGHT, VISIBLE_ITEMS } from './icon-picker.constants';

export const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },

  wrapper: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing.s12,
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.background.surface,
  },

  centerLines: {
    position: 'absolute',
    height: ITEM_HEIGHT,
    width: '100%',
    borderTopWidth: theme.borders.sm,
    borderBottomWidth: theme.borders.sm,
    borderColor: theme.colors.text.placeholder,
    zIndex: -1,
  },
}));
