import { colors } from '@4play/ui';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PhotoPlaceholder } from '../../components/PhotoPlaceholder';
import { useVenue } from '../../lib/venues';

export default function VenueDetail() {
  const { venueId } = useLocalSearchParams<{ venueId: string }>();
  const { data, isLoading } = useVenue(venueId);

  if (isLoading || !data) {
    return (
      <SafeAreaView className="flex-1 bg-cream items-center justify-center">
        <ActivityIndicator color={colors.court} />
      </SafeAreaView>
    );
  }

  const { venue, courts } = data;

  return (
    <View className="flex-1 bg-cream">
      <Stack.Screen
        options={{ headerShown: true, title: venue.name, headerTintColor: colors.ink }}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={{ height: 220 }}>
          <PhotoPlaceholder tone="green" style={{ height: '100%' }}>
            {venue.slug}
          </PhotoPlaceholder>
        </View>
        <View className="px-5 pt-4">
          <Text className="font-display font-bold text-ink" style={{ fontSize: 28 }}>
            {venue.name}
          </Text>
          <Text className="text-body-s text-ash mt-1">
            {venue.neighborhood ?? 'Cartagena'} · {venue.address ?? ''}
          </Text>

          {venue.amenities && venue.amenities.length > 0 && (
            <View className="mt-4 flex-row flex-wrap gap-1.5">
              {venue.amenities.map((a) => (
                <View
                  key={a}
                  className="rounded-pill px-3 py-1"
                  style={{ backgroundColor: colors.sand }}
                >
                  <Text className="font-mono text-mono-s capitalize" style={{ color: colors.ink }}>
                    {a}
                  </Text>
                </View>
              ))}
            </View>
          )}

          <Text className="mt-6 font-mono text-mono-s uppercase text-ash tracking-mono">
            {courts.length} {courts.length === 1 ? 'CANCHA' : 'CANCHAS'}
          </Text>
          <View className="mt-2 gap-2">
            {courts.map((c) => (
              <Link
                key={c.id}
                href={{ pathname: '/booking/new', params: { courtId: c.id } }}
                asChild
              >
                <View
                  className="rounded-card px-4 py-3.5 flex-row items-center justify-between"
                  style={{ backgroundColor: colors.bone, borderColor: colors.line, borderWidth: 1 }}
                >
                  <View>
                    <Text className="font-body font-semibold text-ink text-body-m">{c.name}</Text>
                    <Text className="font-mono text-mono-s text-court mt-0.5 uppercase">
                      {c.sport === 'tennis' ? 'TENIS' : 'PÁDEL'} · {c.surface ?? 'sin info'}
                      {c.is_indoor ? ' · TECHADA' : ''}
                    </Text>
                  </View>
                  <Text
                    className="font-display font-semibold"
                    style={{ color: colors.ink, fontSize: 16 }}
                  >
                    ${Math.round(c.price_per_hour / 100).toLocaleString('es-CO')}
                  </Text>
                </View>
              </Link>
            ))}
            {courts.length === 0 && (
              <Text className="text-body-s text-ash">
                Aún no hay canchas listadas para este venue.
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
