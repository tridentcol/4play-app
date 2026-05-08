import type { TablesInsert } from '@4play/core';
import { type Sport, sportSchema, usernameSchema } from '@4play/core';
import { IconArrow, IconCheck, colors } from '@4play/ui';
import * as Location from 'expo-location';
import { router } from 'expo-router';
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
import { supabase } from '../../lib/supabase';

type WizardData = {
  full_name: string;
  username: string;
  birthdate: string;
  bio: string;
  neighborhood: string;
  city: string;
  location?: { lat: number; lon: number };
  sport: Sport;
  level: number;
  years_playing: number;
};

const initial: WizardData = {
  full_name: '',
  username: '',
  birthdate: '',
  bio: '',
  neighborhood: '',
  city: 'Cartagena',
  sport: 'tennis',
  level: 3.5,
  years_playing: 0,
};

export default function ProfileSetup() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<WizardData>(initial);
  const [submitting, setSubmitting] = useState(false);

  const next = () => setStep((s) => Math.min(s + 1, 2));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const validate = (): string | null => {
    if (step === 0) {
      if (!data.full_name.trim()) return 'Tu nombre es requerido';
      const u = usernameSchema.safeParse(data.username);
      if (!u.success) return 'Username inválido (3-32 minúsculas/números/_)';
      if (data.birthdate && !/^\d{4}-\d{2}-\d{2}$/.test(data.birthdate)) {
        return 'Fecha en formato YYYY-MM-DD';
      }
    }
    if (step === 1) {
      if (data.bio.length > 280) return 'Bio máximo 280 caracteres';
    }
    if (step === 2) {
      if (!sportSchema.safeParse(data.sport).success) return 'Deporte inválido';
      if (data.level < 1 || data.level > 7) return 'Nivel entre 1.0 y 7.0';
    }
    return null;
  };

  const handleNext = () => {
    const err = validate();
    if (err) {
      Alert.alert('Revisa los datos', err);
      return;
    }
    if (step < 2) next();
    else void submit();
  };

  const submit = async () => {
    setSubmitting(true);
    const { data: userData } = await supabase.auth.getUser();
    const uid = userData.user?.id;
    if (!uid) {
      setSubmitting(false);
      Alert.alert('Sesión vencida', 'Vuelve a iniciar sesión.');
      router.replace('/(auth)/onboarding');
      return;
    }

    const profilePayload: TablesInsert<'profiles'> = {
      id: uid,
      full_name: data.full_name.trim(),
      username: data.username.trim().toLowerCase(),
      birthdate: data.birthdate || null,
      bio: data.bio.trim() || null,
      neighborhood: data.neighborhood.trim() || null,
      city: data.city.trim() || 'Cartagena',
    };
    if (data.location) {
      profilePayload.location =
        `POINT(${data.location.lon} ${data.location.lat})` as unknown as never;
    }

    const { error: pErr } = await supabase.from('profiles').upsert(profilePayload);
    if (pErr) {
      setSubmitting(false);
      Alert.alert('Error guardando perfil', pErr.message);
      return;
    }

    const { error: sErr } = await supabase.from('player_sports').upsert({
      profile_id: uid,
      sport: data.sport,
      level: data.level,
      years_playing: data.years_playing,
      is_primary: true,
    });
    if (sErr) {
      setSubmitting(false);
      Alert.alert('Error guardando deporte', sErr.message);
      return;
    }
    setSubmitting(false);
    router.replace('/');
  };

  const requestLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Sin permiso', 'Puedes saltar y configurarlo después en tu perfil.');
      return;
    }
    const pos = await Location.getCurrentPositionAsync({});
    setData((d) => ({ ...d, location: { lat: pos.coords.latitude, lon: pos.coords.longitude } }));
  };

  return (
    <SafeAreaView className="flex-1 bg-cream" edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24 }}>
        <Text className="font-mono text-mono-s uppercase text-ash tracking-[0.14em]">
          PASO {step + 1} DE 3
        </Text>
        <Text className="mt-1 font-display font-bold text-display-xs text-ink">
          {step === 0 ? 'Tu identidad' : step === 1 ? 'Sobre ti' : 'Tu juego'}
        </Text>

        <View className="mt-8 gap-4 flex-1">
          {step === 0 && (
            <>
              <Field
                label="Nombre completo"
                value={data.full_name}
                onChangeText={(v) => setData((d) => ({ ...d, full_name: v }))}
                placeholder="Daniela M."
              />
              <Field
                label="Username"
                value={data.username}
                onChangeText={(v) => setData((d) => ({ ...d, username: v.toLowerCase() }))}
                placeholder="daniela_m"
                autoCapitalize="none"
              />
              <Field
                label="Fecha de nacimiento (opcional)"
                value={data.birthdate}
                onChangeText={(v) => setData((d) => ({ ...d, birthdate: v }))}
                placeholder="1996-08-12"
                autoCapitalize="none"
              />
            </>
          )}

          {step === 1 && (
            <>
              <Field
                label="Barrio"
                value={data.neighborhood}
                onChangeText={(v) => setData((d) => ({ ...d, neighborhood: v }))}
                placeholder="Manga"
              />
              <Field
                label="Ciudad"
                value={data.city}
                onChangeText={(v) => setData((d) => ({ ...d, city: v }))}
                placeholder="Cartagena"
              />
              <Field
                label="Bio (máx 280)"
                value={data.bio}
                onChangeText={(v) => setData((d) => ({ ...d, bio: v }))}
                placeholder="Saco con efecto, busco partidos AM..."
                multiline
              />
              <Pressable
                onPress={requestLocation}
                className="rounded-card border bg-bone px-4 py-3 flex-row items-center justify-between"
                style={{ borderColor: colors.line }}
              >
                <Text className="text-body-s text-ink">
                  {data.location
                    ? `Ubicación capturada (${data.location.lat.toFixed(3)}, ${data.location.lon.toFixed(3)})`
                    : 'Capturar ubicación para matchmaking'}
                </Text>
                {data.location ? <IconCheck size={18} stroke={colors.court} /> : null}
              </Pressable>
            </>
          )}

          {step === 2 && (
            <>
              <View>
                <Text className="font-mono text-mono-s uppercase text-ash mb-2">DEPORTE</Text>
                <View className="flex-row gap-2">
                  {(['tennis', 'padel'] as const).map((s) => (
                    <Pressable
                      key={s}
                      onPress={() => setData((d) => ({ ...d, sport: s }))}
                      className="flex-1 rounded-card px-4 py-3 items-center"
                      style={{
                        backgroundColor: data.sport === s ? colors.ink : colors.bone,
                        borderWidth: 1,
                        borderColor: data.sport === s ? colors.ink : colors.line,
                      }}
                    >
                      <Text
                        className="font-body font-semibold text-body-m capitalize"
                        style={{ color: data.sport === s ? colors.cream : colors.ink }}
                      >
                        {s === 'tennis' ? 'Tenis' : 'Pádel'}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <View>
                <Text className="font-mono text-mono-s uppercase text-ash mb-2">
                  NIVEL · {data.level.toFixed(1)}
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {[1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0].map((lvl) => (
                    <Pressable
                      key={lvl}
                      onPress={() => setData((d) => ({ ...d, level: lvl }))}
                      className="rounded-pill px-3 py-1.5"
                      style={{
                        backgroundColor: data.level === lvl ? colors.lime : colors.bone,
                        borderWidth: 1,
                        borderColor: data.level === lvl ? colors.lime : colors.line,
                      }}
                    >
                      <Text className="font-mono text-mono-m" style={{ color: colors.ink }}>
                        {lvl.toFixed(1)}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <Field
                label="Años jugando"
                value={String(data.years_playing)}
                onChangeText={(v) => {
                  const n = Number.parseInt(v.replace(/\D/g, ''), 10);
                  setData((d) => ({ ...d, years_playing: Number.isFinite(n) ? n : 0 }));
                }}
                keyboardType="numeric"
                placeholder="3"
              />
            </>
          )}
        </View>

        <View className="mt-8 flex-row gap-3">
          {step > 0 && (
            <Pressable
              onPress={back}
              className="flex-1 rounded-pill py-[16px] px-5 items-center"
              style={{ borderColor: colors.ink, borderWidth: 1.5 }}
            >
              <Text className="text-ink font-body font-medium text-body-m">Atrás</Text>
            </Pressable>
          )}
          <Pressable
            onPress={handleNext}
            disabled={submitting}
            className="flex-1 bg-court rounded-pill py-[16px] px-5 flex-row items-center justify-center gap-2"
          >
            {submitting ? (
              <ActivityIndicator color={colors.lime} />
            ) : (
              <>
                <Text className="text-cream font-body font-semibold text-body-m">
                  {step === 2 ? 'Empezar' : 'Siguiente'}
                </Text>
                <IconArrow size={16} stroke={colors.lime} />
              </>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Field({ label, ...props }: { label: string } & React.ComponentProps<typeof TextInput>) {
  return (
    <View>
      <Text className="font-mono text-mono-s uppercase text-ash mb-2">{label}</Text>
      <TextInput
        {...props}
        placeholderTextColor={colors.ash}
        className="bg-bone rounded-card px-4 py-3.5 text-body-l text-ink"
        style={{ borderWidth: 1, borderColor: colors.line }}
      />
    </View>
  );
}
