import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { RootStackParamList, RootTabParamList } from '@/navigation';

export type HomeScreenNavigationProp = BottomTabNavigationProp<
  RootTabParamList & RootStackParamList,
  'Main'
>;
