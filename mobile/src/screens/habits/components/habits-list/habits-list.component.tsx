import { HabitStructure } from '@screens/habits';
import React, { useCallback } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { Text } from '@/components/ui/text';
import { useActiveTranslation } from '@/hooks';

import { HabitWidgetComponent } from './components';
import { styles } from './habits-list.styles';
import { HabitsListProps } from './habits-list.types';

const habitKeyExtractor = (item: HabitStructure) => item.id;

const HabitListRow = React.memo(
  ({
    item,
    index,
    onPress,
  }: {
    item: HabitStructure;
    index: number;
    onPress: (habit: HabitStructure) => void;
  }) => {
    return (
      <HabitWidgetComponent habit={item} index={index} onPress={onPress} />
    );
  },
);

export const HabitsList = React.memo(
  ({ habits, onHabitPress }: HabitsListProps) => {
    const { t } = useActiveTranslation();

    const renderHabitItem = useCallback(
      ({ item, index }: ListRenderItemInfo<HabitStructure>) => (
        <HabitListRow item={item} index={index} onPress={onHabitPress} />
      ),
      [onHabitPress],
    );

    return (
      <FlatList
        data={habits}
        numColumns={2}
        keyExtractor={habitKeyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        columnWrapperStyle={habits.length ? styles.columnWrapper : undefined}
        ListEmptyComponent={
          <Text
            variant={'body'}
            colorType={'secondary'}
            style={styles.emptyHabitsText}
          >
            {t('Schedule.habits.noHabits')}
          </Text>
        }
        renderItem={renderHabitItem}
      />
    );
  },
);
