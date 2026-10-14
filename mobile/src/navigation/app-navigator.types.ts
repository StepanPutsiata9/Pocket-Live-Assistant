import { NavigatorScreenParams } from '@react-navigation/native';
import { ComponentProps, ComponentType } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { FinanceAnalyticTabParamList } from './finance-analytic-navigator/finance-analytic-navigator.types';

export type ScheduleTabParamList = {
  Cleaning: undefined;
  Habits: undefined;
};

export type FoodTabParamList = {
  Meals: undefined;
  Water: undefined;
  Recipes: undefined;
};

export type RootTabParamList = {
  Main: undefined;
  Schedule: NavigatorScreenParams<ScheduleTabParamList> | undefined;
  Finance: undefined;
  Food: NavigatorScreenParams<FoodTabParamList> | undefined;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<RootTabParamList> | undefined;
  FinanceAnalytics:
    | NavigatorScreenParams<FinanceAnalyticTabParamList>
    | undefined;
  FinanceHistory: undefined;
  Login: undefined;
  Register: undefined;
  Settings: undefined;
  Mood: undefined;
  MoodHistory: undefined;
  RecipeDetails: { recipeId: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type IconName = ComponentProps<typeof Ionicons>['name'];

export type FoodTabItem = {
  name: keyof FoodTabParamList;
  component: ComponentType<{}>;
  options: { title: string };
};

export type ScheduleTabItem = {
  name: keyof ScheduleTabParamList;
  component: ComponentType<{}>;
  options: { title: string };
};

export type TabItem = {
  name: keyof RootTabParamList;
  component: ComponentType<{}>;
  options: { title: string };
};
