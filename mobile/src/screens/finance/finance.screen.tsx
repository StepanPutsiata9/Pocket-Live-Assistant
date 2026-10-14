import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import { withUnistyles } from 'react-native-unistyles';

import { Screen } from '@/components/ui/screen';
import { ScreenTitle } from '@/components/ui/screen-title';
import { Text } from '@/components/ui/text';

import { FinanceEmpty, FinanceHeader, TransactionItem } from './components';
import { useFinanceScreen } from './finance.hook';
import { styles } from './finance.styles';

const StyledIndicator = withUnistyles(ActivityIndicator, theme => ({
  color: theme.colors.brand.primary,
}));

export const FinanceScreen = () => {
  const {
    t,
    flatListRef,
    transactions,
    isInitialLoading,
    isRefreshing,
    handleRefresh,
    isEmpty,
  } = useFinanceScreen();
  const navigation = useNavigation();
  return (
    <Screen>
      <ScreenTitle titleKey="Finance.title" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      >
        <FinanceHeader />

        {isInitialLoading ? (
          <View style={styles.loaderBlock}>
            <StyledIndicator size="small" />
          </View>
        ) : (
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            ref={flatListRef}
            data={transactions.slice(0, 5)}
            renderItem={({ item }) => <TransactionItem item={item} />}
            keyExtractor={item => item.id}
            ListFooterComponent={
              !isEmpty && transactions.length > 5 ? (
                <Pressable
                  onPress={() => navigation.navigate('FinanceHistory')}
                >
                  <Text variant="body" colorType="placeholder">
                    {t('Finance.showMore')}
                  </Text>
                </Pressable>
              ) : null
            }
            contentContainerStyle={styles.flatlistContent}
          />
        )}
        {isEmpty && !isInitialLoading && <FinanceEmpty />}
      </ScrollView>
    </Screen>
  );
};
