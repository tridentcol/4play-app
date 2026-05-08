import { colors } from '@4play/ui';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const WEB_BASE = process.env.EXPO_PUBLIC_WEB_BASE_URL ?? 'https://4play.co';

export default function BookingCheckout() {
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>();
  const [loading, setLoading] = useState(false);

  const open = async () => {
    if (!bookingId) return;
    setLoading(true);
    try {
      const url = `${WEB_BASE}/checkout/booking/${bookingId}`;
      const result = await WebBrowser.openAuthSessionAsync(url, 'fourplay://booking/callback');
      if (result.type === 'success') {
        router.replace('/(tabs)/calendar');
      }
    } catch (e) {
      Alert.alert('Error', e instanceof Error ? e.message : 'No pudimos abrir el checkout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-cream" edges={['top', 'bottom']}>
      <Stack.Screen
        options={{ headerShown: true, title: 'Checkout', headerTintColor: colors.ink }}
      />
      <View className="flex-1 items-center justify-center px-6">
        <Text className="font-mono text-mono-m uppercase text-court tracking-mono">CHECKOUT</Text>
        <Text className="mt-2 font-display font-bold text-display-xs text-ink">
          Tu reserva está pending
        </Text>
        <Text className="mt-3 max-w-[280px] text-body-s text-ash text-center">
          Abriremos Wompi en el navegador para que pagues con tarjeta, PSE o Nequi. Cuando regreses,
          la reserva quedará confirmada.
        </Text>
        <Pressable
          onPress={open}
          disabled={loading}
          className="mt-8 rounded-pill px-6 py-[16px]"
          style={{ backgroundColor: colors.court }}
        >
          {loading ? (
            <ActivityIndicator color={colors.lime} />
          ) : (
            <Text className="text-cream font-body font-semibold text-body-l">Pagar con Wompi</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
