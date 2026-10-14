import { HABIT_WEEK_DAYS } from '@screens/habits';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, {
  FadeInUp,
  FadeOutUp,
  LinearTransition,
} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Text } from '@/components/ui/text';
import { useActiveTranslation, usePressAnimation } from '@/hooks';

import { useHabitWidget } from './habit-widget.hook';
import { styles } from './habit-widget.styles';
import { DayNumber, HabitWidgetProps } from './habit-widget.types';

const HabitWidget = (props: HabitWidgetProps) => {
  const { habit, index, onPress } = props;

  const { onMarkButtonPress, shouldShowMarkButton } = useHabitWidget(habit);

  const { t } = useActiveTranslation();
  const { animatedStyle, pressHandlers } = usePressAnimation({
    activeScale: 0.95,
  });
  const countOfDays = habit.days.length as DayNumber;

  const renderStreak = () => {
    const flameColor = styles.iconFlameInactive.color;

    return (
      <View style={styles.streakContainer}>
        <Ionicons name={'flame'} color={flameColor} size={18} />
        <Text colorType={'inverse'}>{habit.streak}</Text>
      </View>
    );
  };

  const renderMarkButton = () => {
    if (!shouldShowMarkButton) {
      return null;
    }

    return (
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={e => {
          e.stopPropagation();
          onMarkButtonPress();
        }}
      >
        <Ionicons name={'checkmark'} color={'white'} size={18} />
      </TouchableOpacity>
    );
  };

  return (
    <Animated.View
      entering={FadeInUp.delay(index * 50).duration(350)}
      exiting={FadeOutUp.duration(500)}
      layout={LinearTransition.springify().damping(15)}
      style={[styles.animatedView, animatedStyle]}
      needsOffscreenAlphaCompositing={true}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.container, { backgroundColor: habit.color }]}
        onPress={() => onPress(habit)}
        {...pressHandlers}
      >
        {renderMarkButton()}
        <View style={styles.habitNameContainer}>
          <Ionicons name={habit.icon} style={styles.icon} size={24} />
          <Text
            variant={'body'}
            numberOfLines={2}
            ellipsizeMode={'tail'}
            style={styles.habitName}
          >
            {habit.name}
          </Text>
        </View>
        <View style={styles.weekContainer}>
          <View style={styles.streakAndWeekContainer}>
            <Text variant={'bodySmall'} style={styles.timesAWeekText}>
              {`${t(`Schedule.habits.timesAWeek.${countOfDays}`)}`}
            </Text>
            {renderStreak()}
          </View>
          <View style={styles.daysContainer}>
            {HABIT_WEEK_DAYS.map(weekDay => {
              const isActive = habit.days?.includes(weekDay);

              return (
                <View
                  key={weekDay}
                  style={[
                    styles.dayItem,
                    isActive ? styles.activeDay : styles.inactiveDay,
                  ]}
                />
              );
            })}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export const HabitWidgetComponent = React.memo(HabitWidget);
