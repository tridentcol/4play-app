import { IconCheck, IconX, colors } from '@4play/ui';
import { Stack, router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const WEB_BASE = process.env.EXPO_PUBLIC_WEB_BASE_URL ?? 'https://4play.co';

const BENEFITS = [
  'Matches ilimitados con jugadores de tu nivel',
  'Reserva canchas en 14 clubes de la ciudad',
  'Chat directo y agenda compartida',
  'Ranking y stats de tus partidos',
] as const;

export default function Paywall() {
  const [loading, setLoading] = useState(false);

  const start = async () => {
    setLoading(true);
    try {
      const url = `${WEB_BASE}/checkout/subscription`;
      const result = await WebBrowser.openAuthSessionAsync(url, 'fourplay://paywall/callback');
      if (result.type === 'cancel' || result.type === 'dismiss') {
        // user closed the browser — no-op
      }
    } catch (e) {
      Alert.alert('Error', e instanceof Error ? e.message : 'No pudimos abrir el checkout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1" style={{ backgroundColor: colors.ink }}>
      <Stack.Screen options={{ headerShown: false }} />
      {/* glow */}
      <View
        style={{
          position: 'absolute',
          top: -120,
          right: -80,
          width: 320,
          height: 320,
          borderRadius: 999,
          backgroundColor: 'rgba(212,255,58,0.18)',
        }}
      />
      <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
        <View className="flex-row items-center justify-between px-5 pt-2">
          <Pressable onPress={() => router.back()}>
            <IconX size={22} stroke={colors.cream} />
          </Pressable>
          <Text
            className="font-mono uppercase"
            style={{ color: colors.lime, fontSize: 11, letterSpacing: 1.4 }}
          >
            4 PLAY+
          </Text>
          <View style={{ width: 22 }} />
        </View>

        <View className="flex-1 px-6 pt-10">
          <Text
            className="font-display font-bold"
            style={{ color: colors.cream, fontSize: 44, letterSpacing: -1.76, lineHeight: 44 }}
          >
            Juega más,{'\n'}
            <Text style={{ color: colors.lime, fontStyle: 'italic' }}>conecta más.</Text>
          </Text>
          <Text
            className="mt-4 max-w-[300px]"
            style={{ color: 'rgba(244,240,232,0.7)', fontSize: 14, lineHeight: 21 }}
          >
            Una membresía simple para todos los jugadores de Cartagena. Sin contrato, cancela cuando
            quieras.
          </Text>

          {/* price card */}
          <View
            className="mt-7"
            style={{
              padding: 22,
              borderRadius: 22,
              backgroundColor: 'rgba(244,240,232,0.06)',
              borderColor: 'rgba(212,255,58,0.25)',
              borderWidth: 1,
            }}
          >
            <View className="flex-row items-baseline justify-between">
              <View>
                <Text
                  className="font-mono uppercase"
                  style={{ color: colors.lime, fontSize: 10, letterSpacing: 1.8 }}
                >
                  MENSUAL
                </Text>
                <Text
                  className="font-display font-bold"
                  style={{
                    color: colors.cream,
                    fontSize: 48,
                    letterSpacing: -1.92,
                    lineHeight: 48,
                  }}
                >
                  $20.000
                </Text>
                <Text style={{ color: 'rgba(244,240,232,0.6)', fontSize: 12, marginTop: 4 }}>
                  COP / mes · sin contrato
                </Text>
              </View>
              <View className="rounded-chip px-2.5 py-1.5" style={{ backgroundColor: colors.lime }}>
                <Text
                  className="font-mono"
                  style={{ color: colors.ink, fontSize: 10, fontWeight: '700', letterSpacing: 0.6 }}
                >
                  7 DÍAS GRATIS
                </Text>
              </View>
            </View>
          </View>

          {/* benefits */}
          <View className="mt-6" style={{ gap: 14 }}>
            {BENEFITS.map((b) => (
              <View key={b} className="flex-row items-center gap-3">
                <View
                  className="items-center justify-center rounded-pill"
                  style={{ width: 26, height: 26, backgroundColor: colors.court }}
                >
                  <IconCheck size={14} stroke={colors.lime} strokeWidth={2.4} />
                </View>
                <Text style={{ color: 'rgba(244,240,232,0.92)', fontSize: 14, flex: 1 }}>{b}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="px-5 pb-3 pt-2">
          <Pressable
            onPress={start}
            disabled={loading}
            className="rounded-pill items-center justify-center py-[18px]"
            style={{ backgroundColor: colors.lime }}
          >
            {loading ? (
              <ActivityIndicator color={colors.ink} />
            ) : (
              <Text style={{ color: colors.ink, fontWeight: '600', fontSize: 16 }}>
                Empezar prueba gratis
              </Text>
            )}
          </Pressable>
          <Text
            className="font-mono uppercase text-center mt-2"
            style={{ color: 'rgba(244,240,232,0.5)', fontSize: 9, letterSpacing: 1 }}
          >
            DESPUÉS $20.000/MES · CANCELA EN 1 TOQUE
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
