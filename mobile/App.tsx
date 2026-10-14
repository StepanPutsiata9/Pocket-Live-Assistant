import './src/i18n';
import './src/theme/unistyles';
import 'react-native-get-random-values';

import { QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import { styles } from './app.styles';
import { queryClient } from './src/api/query-client';
import { AppNavigator } from './src/navigation/app-navigator';
import { AuthProvider } from './src/screens/auth/auth.context';

export default function App() {
  useEffect(() => {
    BootSplash.hide();
  }, []);

  return (
    <GestureHandlerRootView style={styles.root}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <AuthProvider>
            <AppNavigator />
          </AuthProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
