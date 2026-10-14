import LottieView from 'lottie-react-native';
import { View } from 'react-native';

import { animations } from '@/paths';

import { styles } from './app-loader.styles';

export const AppLoader = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={animations.loaderSplash}
        style={styles.loader}
        autoPlay
        loop
      />
    </View>
  );
};
