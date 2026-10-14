import { RefreshControl, ScrollView } from 'react-native';

import { Screen } from '@/components/ui/screen';

import {
  WaterAmountRow,
  WaterCustomControl,
  WaterDashboard,
} from './components';
import { useWaterTab } from './water-tab.hook';
import { styles } from './water-tab.styles';

export const WaterTab = () => {
  const { isRefreshing, handleRefresh } = useWaterTab();

  return (
    <Screen edges={['bottom']}>
      <ScrollView
        style={styles.tabContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      >
        <WaterDashboard />
        <WaterAmountRow />
        <WaterCustomControl />
      </ScrollView>
    </Screen>
  );
};
