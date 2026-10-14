import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useMemo, useState } from 'react';
import Toast from 'react-native-toast-message';
import { useUnistyles } from 'react-native-unistyles';

import { AnimatedBootSplash } from '@/components/ui/boot-spalsh';
import { toastConfig } from '@/components/ui/toasts';
import { notificationService } from '@/notifications';
import { LoginScreen, RegisterScreen, useAuth } from '@/screens/auth';
import { FinanceHistoryScreen } from '@/screens/finance-history';
import { MoodScreen } from '@/screens/mood';
import { MoodHistoryScreen } from '@/screens/mood-history';
import { RecipeDetailsScreen } from '@/screens/recipe-details';
import { SettingsScreen } from '@/screens/settings';
import { saveTokenToServer } from '@/services';

import { RootStackParamList } from './app-navigator.types';
import { FinanceAnalyticNavigator } from './finance-analytic-navigator';
import { navigationRef } from './navigation-ref';
import { buildNavigationTheme } from './navigation-theme';
import { TabNavigator } from './tab-navigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { user, initializing } = useAuth();
  const { theme, rt } = useUnistyles();
  const [splashAnimationDone, setSplashAnimationDone] = useState(false);

  const navigationTheme = useMemo(
    () => buildNavigationTheme(theme, rt.themeName ?? 'light'),
    [rt.themeName, theme],
  );

  const stackScreenOptions = useMemo(
    () => ({
      headerShown: false as const,
      contentStyle: { backgroundColor: theme.colors.background.main },
    }),
    [theme.colors.background.main],
  );

  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    notificationService.initAllNotifications().then(unsubFn => {
      if (cancelled) unsubFn?.();
      else cleanup = unsubFn;
    });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  useEffect(() => {
    if (user) {
      saveTokenToServer();
    }
  }, [user]);

  return (
    <>
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        <BottomSheetModalProvider>
          <Stack.Navigator screenOptions={stackScreenOptions}>
            {user ? (
              <>
                <Stack.Screen name="Tabs" component={TabNavigator} />
                <Stack.Screen
                  name="FinanceAnalytics"
                  component={FinanceAnalyticNavigator}
                />
                <Stack.Screen
                  name="FinanceHistory"
                  component={FinanceHistoryScreen}
                />
                <Stack.Screen
                  name="RecipeDetails"
                  component={RecipeDetailsScreen}
                />
                <Stack.Screen name="Settings" component={SettingsScreen} />
                <Stack.Screen name="Mood" component={MoodScreen} />
                <Stack.Screen
                  name="MoodHistory"
                  component={MoodHistoryScreen}
                />
              </>
            ) : (
              <>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
              </>
            )}
          </Stack.Navigator>
        </BottomSheetModalProvider>
      </NavigationContainer>

      {!splashAnimationDone && (
        <AnimatedBootSplash
          isReady={!initializing}
          onAnimationEnd={() => setSplashAnimationDone(true)}
        />
      )}

      <Toast config={toastConfig} />
    </>
  );
};
