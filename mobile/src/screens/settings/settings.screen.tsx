import { useRef } from 'react';
import { ScrollView } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { Screen } from '@/components/ui/screen';
import { useFadeInStagger } from '@/hooks';

import {
  AvatarCard,
  ConfirmationModal,
  ConfirmationModalProvider,
  Header,
  LanguageSwitcher,
  LogoutButton,
  ThemeSwitcher,
} from './components';
import { styles } from './settings.styles';

const SECTION_COUNT = 4;

export const SettingsScreen = () => {
  const { getAnimatedProps } = useFadeInStagger(100);
  const enteringAnimations = useRef<
    ReturnType<typeof FadeInDown.springify>[] | null
  >(null);

  if (!enteringAnimations.current) {
    enteringAnimations.current = Array.from({ length: SECTION_COUNT }, (_, i) =>
      getAnimatedProps(i),
    );
  }

  const entering = enteringAnimations.current;

  return (
    <ConfirmationModalProvider>
      <Screen edges={['top']}>
        <ConfirmationModal />
        <Header />
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View entering={entering[0]}>
            <AvatarCard />
          </Animated.View>
          <Animated.View entering={entering[1]}>
            <ThemeSwitcher />
          </Animated.View>
          <Animated.View entering={entering[2]}>
            <LanguageSwitcher />
          </Animated.View>
          <Animated.View entering={entering[3]}>
            <LogoutButton />
          </Animated.View>
        </ScrollView>
      </Screen>
    </ConfirmationModalProvider>
  );
};
