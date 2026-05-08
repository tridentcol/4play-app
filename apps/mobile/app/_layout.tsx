import 'react-native-gesture-handler';
import 'react-native-reanimated';
import '../global.css';

import { identify, resetAnalytics } from '@4play/core';
import {
  BricolageGrotesque_700Bold,
  useFonts as useBricolage,
} from '@expo-google-fonts/bricolage-grotesque';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import {
  JetBrainsMono_400Regular,
  JetBrainsMono_500Medium,
  JetBrainsMono_600SemiBold,
} from '@expo-google-fonts/jetbrains-mono';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Notifications from 'expo-notifications';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAuthState } from '../lib/auth';
import { initObservability } from '../lib/observability';
import { registerForPushNotificationsAsync, resolveDeepLink } from '../lib/push';

SplashScreen.preventAutoHideAsync().catch(() => {
  // Splash already hidden — no-op.
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
});

export default function RootLayout() {
  const [fontsLoaded] = useBricolage({
    BricolageGrotesque_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    JetBrainsMono_400Regular,
    JetBrainsMono_500Medium,
    JetBrainsMono_600SemiBold,
  });

  const auth = useAuthState();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!fontsLoaded || auth.status === 'loading') return;
    SplashScreen.hideAsync().catch(() => {});

    const inAuthGroup = segments[0] === '(auth)';
    if (auth.status === 'unauthenticated' && !inAuthGroup) {
      router.replace('/(auth)/onboarding');
    } else if (auth.status === 'authenticated' && inAuthGroup) {
      router.replace('/');
    }
  }, [fontsLoaded, auth.status, segments, router]);

  // Initialize Sentry + PostHog once on boot.
  useEffect(() => {
    void initObservability();
  }, []);

  // Register for push notifications + analytics identity once authenticated.
  useEffect(() => {
    if (auth.status === 'authenticated') {
      void registerForPushNotificationsAsync(auth.session.user.id);
      identify(auth.session.user.id);
    } else if (auth.status === 'unauthenticated') {
      resetAnalytics();
    }
  }, [auth.status, auth]);

  // Deep-link from notification taps.
  useEffect(() => {
    const sub = Notifications.addNotificationResponseReceivedListener((response) => {
      const data = response.notification.request.content.data as Record<string, unknown> | null;
      const path = resolveDeepLink(data);
      if (path) router.push(path as never);
    });
    return () => sub.remove();
  }, [router]);

  if (!fontsLoaded || auth.status === 'loading') {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: '#F4F0E8' },
            }}
          />
          <StatusBar style="dark" />
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
