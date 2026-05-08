import { colors } from '@4play/ui';
import { Link } from 'expo-router';
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, G, Line, Path } from 'react-native-svg';
import { PhotoPlaceholder, type PhotoTone } from '../../components/PhotoPlaceholder';
import { type NearbyVenue, useNearbyVenues } from '../../lib/venues';

const VENUE_TONES: PhotoTone[] = ['green', 'coral', 'ink', 'sand'];

export default function Calendar() {
  const { data: venues, isLoading } = useNearbyVenues();

  return (
    <SafeAreaView className="flex-1 bg-cream" edges={['top']}>
      <View className="px-5 pt-2 pb-2">
        <Text className="font-mono text-mono-m uppercase text-court tracking-mono">AGENDAR</Text>
        <Text className="mt-1 font-display font-bold text-display-xs text-ink">
          Canchas en Cartagena
        </Text>
      </View>

      {/* mini map */}
      <View
        className="mx-5 overflow-hidden"
        style={{ height: 130, borderRadius: 18, backgroundColor: colors.ink }}
      >
        <Svg viewBox="0 0 350 130" width="100%" height="100%">
          <Path
            d="M0 80 Q60 55 130 70 T260 60 T350 75 L350 130 L0 130Z"
            fill={colors.court}
            opacity="0.6"
          />
          <Path d="M0 95 Q70 75 140 85 T280 80 T350 90 L350 130 L0 130Z" fill={colors.court} />
          {[20, 60, 100].map((y) => (
            <Line key={y} x1="0" y1={y} x2="350" y2={y} stroke={colors.lime} strokeOpacity="0.08" />
          ))}
          {[60, 140, 220, 300].map((x) => (
            <Line key={x} x1={x} y1="0" x2={x} y2="130" stroke={colors.lime} strokeOpacity="0.08" />
          ))}
          {(venues ?? []).slice(0, 6).map((v, i) => {
            const x = 50 + ((i * 67) % 280);
            const y = 30 + (i % 3) * 25;
            return (
              <G key={v.id}>
                <Circle cx={x} cy={y} r="9" fill={colors.lime} opacity="0.25" />
                <Circle cx={x} cy={y} r="4" fill={colors.lime} />
              </G>
            );
          })}
        </Svg>
        <View
          className="absolute rounded-card px-2.5 py-1.5"
          style={{ bottom: 10, right: 10, backgroundColor: 'rgba(244,240,232,0.95)' }}
        >
          <Text
            className="font-mono"
            style={{ fontSize: 10, letterSpacing: 0.6, color: colors.ink }}
          >
            {venues?.length ?? 0} CANCHAS
          </Text>
        </View>
      </View>

      {isLoading && (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color={colors.court} />
        </View>
      )}

      {!isLoading && (
        <FlatList
          data={venues ?? []}
          keyExtractor={(v) => v.id}
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: 24 }}
          renderItem={({ item, index }) => (
            <VenueRow item={item} tone={VENUE_TONES[index % VENUE_TONES.length] ?? 'green'} />
          )}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: colors.line, marginVertical: 4 }} />
          )}
          ListEmptyComponent={() => (
            <View className="items-center pt-12">
              <Text className="text-body-s text-ash text-center max-w-[260px]">
                No hay canchas en este radio. Aumenta el radio en filtros.
              </Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

function VenueRow({ item, tone }: { item: NearbyVenue; tone: PhotoTone }) {
  const price = item.min_price ? Math.round(item.min_price / 100).toLocaleString('es-CO') : '—';
  return (
    <Link href={{ pathname: '/venue/[venueId]', params: { venueId: item.id } }} asChild>
      <Pressable className="flex-row gap-3 py-3">
        <View className="overflow-hidden" style={{ width: 64, height: 64, borderRadius: 12 }}>
          <PhotoPlaceholder tone={tone} style={{ width: 64, height: 64, padding: 6 }}>
            {item.name.split(' ')[0] ?? ''}
          </PhotoPlaceholder>
        </View>
        <View className="flex-1">
          <View className="flex-row justify-between items-baseline gap-2">
            <Text className="font-body font-semibold text-ink text-body-m flex-1" numberOfLines={1}>
              {item.name}
            </Text>
            <Text className="font-mono text-mono-m text-ash">{item.distance_km.toFixed(1)} km</Text>
          </View>
          <Text className="text-body-xs text-ash mt-0.5" numberOfLines={1}>
            {item.neighborhood ?? 'Cartagena'}
          </Text>
          <View className="mt-1.5 flex-row justify-between items-center">
            <View
              className="rounded-chip px-2 py-1"
              style={{ backgroundColor: item.has_sport ? colors.lime : colors.sand }}
            >
              <Text
                className="font-mono"
                style={{ color: colors.ink, fontSize: 10, fontWeight: '600' }}
              >
                {item.has_sport ? 'DISPONIBLE' : 'CONSULTAR'}
              </Text>
            </View>
            <Text
              className="font-display font-semibold"
              style={{ color: colors.ink, fontSize: 14 }}
            >
              ${price}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
