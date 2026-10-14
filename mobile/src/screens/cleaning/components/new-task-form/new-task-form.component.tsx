import { View } from 'react-native';
import Animated, { FadeOut, LinearTransition } from 'react-native-reanimated';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Dropdown } from '@/components/ui/dropdown';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { ToggleRow } from '@/components/ui/toggle-row';
import { useFadeInStagger } from '@/hooks';

import { useNewTaskForm } from './new-task-form.hook';
import { styles } from './new-task-form.styles';

const AnimatedCard = Animated.createAnimatedComponent(Card);

export const NewTaskForm = () => {
  const {
    isOptionsExpanded,
    onPress,
    t,
    priorityDropdownData,
    priority,
    handlePrioritySelect,
    setTitle,
    handleRoomChange,
    isDateEnabled,
    setIsDateEnabled,
    setSelectedDate,
    selectedDate,
    title,
    handleSubmit,
  } = useNewTaskForm();

  const { getAnimatedProps } = useFadeInStagger();

  return (
    <AnimatedCard layout={LinearTransition} style={styles.container}>
      <View style={styles.newTaskCardContent}>
        <Text variant="h3" colorType="main">
          {t('Cleaning.addTask')}
        </Text>
        <View style={styles.formContainer}>
          <Input
            placeholder={t('Cleaning.placeholder')}
            value={title}
            onChangeText={setTitle}
          />
          {isOptionsExpanded && (
            <View style={styles.formContainer}>
              <Animated.View
                entering={getAnimatedProps(0)}
                exiting={FadeOut.duration(300)}
              >
                <Input
                  placeholder={t('Cleaning.addRoom')}
                  onChangeText={handleRoomChange}
                />
              </Animated.View>

              <Animated.View
                entering={getAnimatedProps(1)}
                exiting={FadeOut.duration(200)}
              >
                <Dropdown
                  data={priorityDropdownData}
                  value={priority}
                  onSelect={handlePrioritySelect}
                />
              </Animated.View>

              <Animated.View
                entering={getAnimatedProps(2)}
                exiting={FadeOut.duration(100)}
              >
                <ToggleRow
                  title={t('Cleaning.addDate')}
                  value={isDateEnabled}
                  onValueChange={setIsDateEnabled}
                />
              </Animated.View>

              {isDateEnabled && (
                <Animated.View entering={getAnimatedProps(3)}>
                  <Calendar
                    selectedDate={selectedDate}
                    onDateSelect={setSelectedDate}
                  />
                </Animated.View>
              )}
            </View>
          )}
        </View>
        <Animated.View style={styles.buttonContainer} layout={LinearTransition}>
          <Button
            title={
              isOptionsExpanded
                ? t('Cleaning.lessOptions')
                : t('Cleaning.moreOptions')
            }
            variant="outline"
            onPress={onPress}
            style={styles.button}
          />
          <Button
            title={t('Cleaning.add')}
            style={styles.button}
            disabled={!title.trim()}
            onPress={handleSubmit}
          />
        </Animated.View>
      </View>
    </AnimatedCard>
  );
};
