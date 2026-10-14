import { useCallback } from 'react';
import { SectionList, View } from 'react-native';

import { Card } from '@/components/ui/card';
import { TaskItem } from '@/components/ui/task-item';
import { Text } from '@/components/ui/text';
import { Task } from '@/types/task.ts';

import { useActiveTasks } from './active-tasks.hook';
import { styles } from './active-tasks.styles';

export const ActiveTasks = () => {
  const { t, activeTasksCount, sections, toggleTask, deleteTask } =
    useActiveTasks();

  const renderTaskItem = useCallback(
    ({ item }: { item: Task }) => (
      <TaskItem
        text={item.title}
        isChecked={item.isCompleted}
        priority={item.priority}
        date={item.date}
        onPress={() => toggleTask(item.id)}
        onDelete={() => deleteTask(item.id)}
      />
    ),
    [deleteTask, toggleTask],
  );

  return (
    <Card>
      <View>
        <Text variant="h3" colorType="main">
          {t('Cleaning.activeTasks')} ({activeTasksCount})
        </Text>

        {activeTasksCount > 0 ? (
          <SectionList
            sections={sections}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            renderItem={renderTaskItem}
            renderSectionHeader={({ section: { title } }) => (
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{title}</Text>
              </View>
            )}
          />
        ) : (
          <Text variant="body" colorType="secondary" style={styles.emptyText}>
            {t('Cleaning.noActiveTasks')}
          </Text>
        )}
      </View>
    </Card>
  );
};
