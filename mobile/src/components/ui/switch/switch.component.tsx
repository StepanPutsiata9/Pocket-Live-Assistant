// import { memo } from 'react';
// import { Animated, Pressable, View } from 'react-native';

// import { useSwitch } from './switch.hook';
// import { styles } from './switch.styles';
// import { SwitchProps } from './switch.types';

// function SwitchComponent(props: SwitchProps) {
//   const {
//     handlePress,
//     hitSlop,
//     instantThumbStyle,
//     isAnimated,
//     slidingThumbStyle,
//     visualValue,
//   } = useSwitch(props);

//   styles.useVariants({ value: visualValue });

//   const thumb = isAnimated ? (
//     <Animated.View style={slidingThumbStyle}>
//       <View style={styles.thumb} />
//     </Animated.View>
//   ) : (
//     <View style={[styles.thumb, instantThumbStyle]} />
//   );

//   return (
//     <Pressable onPress={handlePress} hitSlop={hitSlop}>
//       <View style={[styles.track, props.style]}>{thumb}</View>
//     </Pressable>
//   );
// }
// export const Switch = memo(SwitchComponent);

import { memo } from 'react';
import { Animated, Pressable, View } from 'react-native';

import { useSwitch } from './switch.hook';
import { styles } from './switch.styles';
import { SwitchProps } from './switch.types';

function SwitchComponent(props: SwitchProps) {
  const { handlePress, hitSlop, slidingThumbStyle } = useSwitch(props);
  styles.useVariants({ value: props.value });

  return (
    <Pressable onPress={handlePress} hitSlop={hitSlop}>
      <View style={[styles.track, props.style]}>
        <Animated.View style={[styles.thumb, slidingThumbStyle]} />
      </View>
    </Pressable>
  );
}

export const Switch = memo(SwitchComponent);
