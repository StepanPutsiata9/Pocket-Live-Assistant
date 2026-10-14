import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useRightAction } from './right-action.hook';
import { styles } from './right-action.styles';
import { RightActionProps } from './right-action.types';

const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);

export const RightAction = ({ drag }: RightActionProps) => {
  const { iconAnimatedStyle } = useRightAction(drag);

  return (
    <View style={styles.deleteAction}>
      <AnimatedIonicons
        name="trash-outline"
        style={[styles.deleteActionIcon, iconAnimatedStyle]}
      />
    </View>
  );
};
