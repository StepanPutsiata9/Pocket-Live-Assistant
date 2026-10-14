import { RefreshControl, ScrollView, View } from 'react-native';

import { Screen } from '@/components/ui/screen';

import { AddMealForm } from './components/add-meal-form';
import { MealsDashboard } from './components/meals-dashboard';
import { MealsGrid } from './components/meals-grid';
import { MealsHistory } from './components/meals-history';
import { useMeals } from './meals-tab.hook';
import { styles } from './meals-tab.styles';

export const MealsTab = () => {
  const { isRefreshing, handleRefresh } = useMeals();

  return (
    <Screen edges={['bottom']}>
      <View style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
        >
          <MealsDashboard />
          <AddMealForm />
          <MealsGrid />
          <MealsHistory />
        </ScrollView>
      </View>
    </Screen>
  );
};
