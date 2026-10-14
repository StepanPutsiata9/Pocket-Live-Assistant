import { View } from 'react-native';

import { styles } from './top-tab-bar-view.styles';
import { TopTabBarViewProps } from './top-tab-bar-view.types';

export const TopTabBarView = (props: TopTabBarViewProps) => {
  const { children } = props;

  return <View style={styles.container}>{children}</View>;
};
