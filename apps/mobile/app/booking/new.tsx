import { type TablesInsert, track } from '@4play/core';
import { IconArrow, colors } from '@4play/ui';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthState } from '../../lib/auth';
import { supabase } from '../../lib/supabase';

const HOURS = ['06:00', '07:00', '08:00', '09:00', '17:00', '18:00', '19:00', '20:00'] as const;

export default function NewBooking() {
  const { courtId } = useLocalSearchParams<{ courtId: string }>();
  const auth = useAuthState();
  const userId = auth.status === 'authenticated' ? auth.session.user.id : undefined;
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  });
  const [hour, setHour] = useState<(typeof HOURS)[number]>('18:00');
  const [duration, setDuration] = useState<1 | 2>(1);
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (!courtId || !userId) return;
    setSubmitting(true);
    try {
      const start = new Date(`${date}T${hour}:00-05:00`);
      const end = new Date(start.getTime() + duration * 60 * 60 * 1000);
      if (start.getTime() <= Date.now()) {
        Alert.alert('Fecha inválida', 'No puedes agendar en el pasado.');
        setSubmitting(false);
        return;
      }
      // Look up the price to compute amount; falls back to 0 if missing.
      const { data: court } = await supabase
        .from('courts')
        .select('price_per_hour')
        .eq('id', courtId)
        .maybeSingle();
      const totalAmount = (court?.price_per_hour ?? 0) * duration;

      const payload: TablesInsert<'bookings'> = {
        court_id: courtId,
        booker_id: userId,
        start_at: start.toISOString(),
        end_at: end.toISOString(),
        total_amount: totalAmount,
        platform_fee: Math.round(totalAmount * 0.05),
        status: 'pending',
      };
      const { data: inserted, error } = await supabase
        .from('bookings')
        .insert(payload)
        .select('id')
        .single();
      if (error) throw error;
      track('booking_started', { booking_id: inserted.id, total_amount: totalAmount });
      router.replace({
        pathname: '/booking/[bookingId]/checkout',
        params: { bookingId: inserted.id },
      });
    } catch (e) {
      Alert.alert('Error', e instanceof Error ? e.message : 'No pudimos crear la reserva');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-cream" edges={['top', 'bottom']}>
      <Stack.Screen
        options={{ headerShown: true, title: 'Nueva reserva', headerTintColor: colors.ink }}
      />
      <ScrollView contentContainerStyle={{ padding: 20, gap: 24 }}>
        <Section title="Día">
          <TextInput
            value={date}
            onChangeText={setDate}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={colors.ash}
            className="rounded-card bg-bone px-4 py-3.5 text-body-l text-ink"
            style={{ borderWidth: 1, borderColor: colors.line }}
          />
        </Section>

        <Section title="Hora de inicio">
          <View className="flex-row flex-wrap gap-2">
            {HOURS.map((h) => (
              <Pressable
                key={h}
                onPress={() => setHour(h)}
                className="rounded-pill px-4 py-2"
                style={{
                  backgroundColor: hour === h ? colors.ink : colors.bone,
                  borderColor: hour === h ? colors.ink : colors.line,
                  borderWidth: 1,
                }}
              >
                <Text
                  className="font-mono"
                  style={{ color: hour === h ? colors.cream : colors.ink, fontSize: 12 }}
                >
                  {h}
                </Text>
              </Pressable>
            ))}
          </View>
        </Section>

        <Section title="Duración">
          <View className="flex-row gap-2">
            {([1, 2] as const).map((h) => (
              <Pressable
                key={h}
                onPress={() => setDuration(h)}
                className="flex-1 rounded-card items-center px-4 py-3"
                style={{
                  backgroundColor: duration === h ? colors.lime : colors.bone,
                  borderColor: duration === h ? colors.lime : colors.line,
                  borderWidth: 1,
                }}
              >
                <Text
                  className="font-body font-semibold"
                  style={{ color: colors.ink, fontSize: 15 }}
                >
                  {h}h
                </Text>
              </Pressable>
            ))}
          </View>
        </Section>

        <Pressable
          onPress={submit}
          disabled={submitting}
          className="mt-4 bg-court rounded-pill py-[16px] flex-row items-center justify-between px-5"
        >
          {submitting ? (
            <ActivityIndicator color={colors.lime} />
          ) : (
            <>
              <Text className="text-cream font-body font-semibold text-body-l">
                Reservar y pagar
              </Text>
              <IconArrow size={18} stroke={colors.lime} />
            </>
          )}
        </Pressable>
        <Text className="text-body-xs text-ash text-center -mt-1">
          La reserva queda en pending hasta confirmar el pago en Wompi.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View>
      <Text className="font-mono text-mono-s uppercase text-ash mb-2 tracking-mono">{title}</Text>
      {children}
    </View>
  );
}
