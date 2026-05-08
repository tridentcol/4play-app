import { IconPin, colors } from '@4play/ui';
import { Link } from 'expo-router';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PhotoPlaceholder } from '../../components/PhotoPlaceholder';
import { useProfile } from '../../lib/profile';

export default function Profile() {
  const { data, isLoading } = useProfile();

  if (isLoading || !data) {
    return (
      <SafeAreaView className="flex-1 bg-cream items-center justify-center">
        <ActivityIndicator color={colors.court} />
      </SafeAreaView>
    );
  }

  const { profile, sports } = data;
  const primarySport = sports.find((s) => s.is_primary) ?? sports[0];
  const age = profile.birthdate
    ? Math.floor(
        (Date.now() - new Date(profile.birthdate).getTime()) / (365.25 * 24 * 60 * 60 * 1000),
      )
    : null;

  return (
    <View className="flex-1 bg-cream">
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        {/* photo header */}
        <View style={{ height: 240, position: 'relative' }}>
          <PhotoPlaceholder tone="green" style={{ height: '100%' }}>
            foto principal
          </PhotoPlaceholder>
          <SafeAreaView edges={['top']} style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
            <View className="flex-row items-center justify-between px-4 pt-2">
              <View style={{ width: 36, height: 36 }} />
              <View className="flex-row gap-1.5">
                {[0, 1, 2, 3].map((i) => (
                  <View
                    key={i}
                    style={{
                      width: 28,
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: i === 0 ? colors.lime : 'rgba(244,240,232,0.4)',
                    }}
                  />
                ))}
              </View>
              <Link href="/(modals)/settings" asChild>
                <Pressable
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 999,
                    backgroundColor: 'rgba(14,27,44,0.55)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ color: colors.cream, fontSize: 18 }}>⚙</Text>
                </Pressable>
              </Link>
            </View>
          </SafeAreaView>
        </View>

        {/* info card */}
        <View className="px-5 pt-4">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-3">
              <Text
                className="font-display font-bold text-ink"
                style={{ fontSize: 28, letterSpacing: -0.84, lineHeight: 28 }}
              >
                {profile.full_name}
                {age ? `, ${age}` : ''}
              </Text>
              <View className="mt-1.5 flex-row items-center gap-1.5">
                <IconPin size={13} stroke={colors.ash} />
                <Text className="text-body-xs text-ash">
                  {profile.neighborhood ?? '—'}
                  {profile.city ? ` · ${profile.city}` : ''}
                </Text>
              </View>
            </View>
            {primarySport && (
              <View
                className="items-center"
                style={{
                  backgroundColor: colors.court,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 10,
                }}
              >
                <Text
                  className="font-display font-bold"
                  style={{ color: colors.cream, fontSize: 16 }}
                >
                  {primarySport.level.toFixed(1)}
                </Text>
                <Text
                  className="font-mono"
                  style={{ color: colors.lime, fontSize: 9, letterSpacing: 0.6 }}
                >
                  NIVEL
                </Text>
              </View>
            )}
          </View>

          {/* stat strip */}
          <View
            className="mt-4 flex-row"
            style={{
              backgroundColor: colors.bone,
              borderColor: colors.line,
              borderWidth: 1,
              borderRadius: 14,
              paddingVertical: 14,
            }}
          >
            {[
              { k: '0', v: 'partidos' },
              { k: '—', v: 'victorias' },
              { k: '0', v: 'matches' },
            ].map((s, i) => (
              <View
                key={s.v}
                className="flex-1 items-center"
                style={{ borderLeftColor: colors.line, borderLeftWidth: i ? 1 : 0 }}
              >
                <Text className="font-display font-bold text-ink" style={{ fontSize: 22 }}>
                  {s.k}
                </Text>
                <Text className="font-mono text-mono-s uppercase text-ash mt-0.5">{s.v}</Text>
              </View>
            ))}
          </View>

          {/* sports */}
          <Section title="Deportes">
            <View className="flex-row gap-2">
              {sports.map((sp) => (
                <View
                  key={sp.id}
                  className="flex-1 px-3.5 py-3 rounded-card flex-row items-center justify-between"
                  style={{
                    backgroundColor: sp.is_primary ? colors.ink : colors.bone,
                    borderColor: sp.is_primary ? colors.ink : colors.line,
                    borderWidth: 1,
                  }}
                >
                  <Text
                    className="font-body font-semibold capitalize"
                    style={{ color: sp.is_primary ? colors.cream : colors.ink, fontSize: 15 }}
                  >
                    {sp.sport === 'tennis' ? 'Tenis' : 'Pádel'}
                  </Text>
                  <Text
                    className="font-mono font-semibold"
                    style={{ color: sp.is_primary ? colors.lime : colors.ash, fontSize: 12 }}
                  >
                    {sp.level.toFixed(1)}
                  </Text>
                </View>
              ))}
              {sports.length === 0 && (
                <Text className="text-body-s text-ash">Aún no hay deportes registrados.</Text>
              )}
            </View>
          </Section>

          {/* bio */}
          {profile.bio && (
            <Section title="Bio">
              <Text className="text-body-s text-ink leading-6 mt-1">{profile.bio}</Text>
            </Section>
          )}

          {/* favorite venues */}
          {profile.favorite_venues && profile.favorite_venues.length > 0 && (
            <Section title="Canchas favoritas">
              <View className="flex-row flex-wrap gap-1.5">
                {profile.favorite_venues.map((v) => (
                  <View
                    key={v}
                    className="px-3 py-1.5 rounded-pill"
                    style={{ backgroundColor: colors.sand }}
                  >
                    <Text className="text-body-xs text-ink">{v}</Text>
                  </View>
                ))}
              </View>
            </Section>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="mt-5">
      <Text className="font-mono text-mono-s uppercase text-ash mb-2 tracking-mono">{title}</Text>
      {children}
    </View>
  );
}
