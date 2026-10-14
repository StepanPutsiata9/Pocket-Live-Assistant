import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

const LAYOUT_STYLE_KEYS = new Set<keyof ViewStyle>([
  'flex',
  'flexGrow',
  'flexShrink',
  'flexBasis',
  'width',
  'height',
  'minWidth',
  'maxWidth',
  'minHeight',
  'maxHeight',
  'aspectRatio',
  'alignSelf',
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'marginHorizontal',
  'marginVertical',
  'marginStart',
  'marginEnd',
  'position',
  'top',
  'right',
  'bottom',
  'left',
  'start',
  'end',
  'zIndex',
  'display',
]);

export const splitButtonStyle = (style?: StyleProp<ViewStyle>) => {
  const flat = StyleSheet.flatten(style) ?? {};
  const layoutStyle: Record<string, unknown> = {};
  const pressableStyle: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(flat)) {
    if (value === undefined) continue;

    if (LAYOUT_STYLE_KEYS.has(key as keyof ViewStyle)) {
      layoutStyle[key] = value;
    } else {
      pressableStyle[key] = value;
    }
  }

  return {
    layoutStyle: layoutStyle as ViewStyle,
    pressableStyle: pressableStyle as ViewStyle,
  };
};
