import React from 'react';
import { Pressable, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Checkbox } from '@/components/ui/checkbox';
import { Text } from '@/components/ui/text';
import { useCheckboxAnimation } from '@/hooks';

import { formatDate, getPriorityExclamation } from './task-item.helpers';
import { styles } from './task-item.styles';
import { TaskItemProps } from './task-item.types';

const TaskItemComponent = ({
  text,
  isChecked,
  priority,
  date,
  onPress,
  onDelete,
  style,
}: TaskItemProps) => {
  styles.useVariants({
    isChecked: isChecked,
  });

  const { fillStyle, checkStyle, animateToggle } = useCheckboxAnimation(
    isChecked,
    onPress,
  );

  return (
    <View style={[styles.container, style]}>
      <Pressable onPress={animateToggle} style={styles.leftContent}>
        <View style={styles.checkboxContainer}>
          <Checkbox
            isChecked={isChecked}
            fillStyle={fillStyle}
            checkStyle={checkStyle}
          />
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.titleRow}>
            {priority && priority !== 'noPriority' && (
              <Text
                variant="body"
                colorType="error"
                style={styles.priorityText}
              >
                {getPriorityExclamation(priority)}
              </Text>
            )}

            <Text
              variant="body"
              colorType="main"
              style={styles.text}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {text}
            </Text>
          </View>

          {date && (
            <Text variant="caption" colorType="secondary">
              {formatDate(date)}
            </Text>
          )}
        </View>
      </Pressable>

      <TouchableOpacity onPress={onDelete}>
        <Ionicons name="close-outline" style={styles.deleteIcon} />
      </TouchableOpacity>
    </View>
  );
};

export const TaskItem = React.memo(TaskItemComponent);
