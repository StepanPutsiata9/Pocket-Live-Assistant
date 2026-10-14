import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { useActiveTranslation, usePressAnimation } from '@/hooks';
import { useMoods } from '@/store/mood';

import { MoodHistoryItem } from './components';
import { styles } from './mood-history.styles';

const MoodHistoryItemMemo = React.memo(MoodHistoryItem);

export const MoodHistoryScreen = () => {
  const { t } = useActiveTranslation();
  const navigation = useNavigation();
  const { moods, isLoading } = useMoods();
  const { animatedStyle, pressHandlers } = usePressAnimation({
    activeScale: 0.9,
  });

  const sorted = [...moods].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <Screen edges={['top']}>
      <View style={styles.header}>
        <Animated.View style={animatedStyle}>
          <Pressable
            {...pressHandlers}
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back-outline" style={styles.backIcon} />
          </Pressable>
        </Animated.View>
        <Text variant="h2" colorType="main">
          {t('Mood.historyTitle')}
        </Text>
      </View>

      <FlatList
        data={sorted}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <MoodHistoryItemMemo item={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshing={isLoading}
        ListEmptyComponent={
          !isLoading ? (
            <Text variant="body" colorType="secondary" style={styles.empty}>
              {t('Mood.historyEmpty')}
            </Text>
          ) : null
        }
      />
    </Screen>
  );
};
