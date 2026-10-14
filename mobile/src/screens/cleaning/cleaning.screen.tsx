import { ScrollView, View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

import { Screen } from '@/components/ui/screen';

import { styles } from './cleaning.styles.ts';
import { ActiveTasks, CompletedTasks, NewTaskForm } from './components';

export function CleaningScreen() {
  return (
    <Screen edges={['bottom']}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <NewTaskForm />

          <Animated.View layout={LinearTransition}>
            <ActiveTasks />
          </Animated.View>

          <Animated.View layout={LinearTransition}>
            <CompletedTasks />
          </Animated.View>
        </ScrollView>
      </View>
    </Screen>
  );
}
