import { useCallback } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Card } from '@/components/ui/card';
import { TaskItem } from '@/components/ui/task-item';
import { Text } from '@/components/ui/text';
import { Task } from '@/types/task.ts';

import { useCompletedTasks } from './completed-tasks.hook';
import { styles } from './completed-tasks.styles';

export const CompletedTasks = () => {
  const { t, completedTasks, clearCompletedTasks, toggleTask, deleteTask } =
    useCompletedTasks();

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
        <View style={styles.tasksCardHeader}>
          <Text variant="h3" colorType="main">
            {t('Cleaning.completedTasks')} ({completedTasks.length})
          </Text>
          {completedTasks.length > 0 && (
            <TouchableOpacity onPress={clearCompletedTasks}>
              <Ionicons name="trash-outline" style={styles.icon} />
            </TouchableOpacity>
          )}
        </View>

        {completedTasks.length > 0 ? (
          <FlatList
            data={completedTasks}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            renderItem={renderTaskItem}
          />
        ) : (
          <Text variant="body" colorType="secondary" style={styles.emptyText}>
            {t('Cleaning.noCompletedTasks')}
          </Text>
        )}
      </View>
    </Card>
  );
};
