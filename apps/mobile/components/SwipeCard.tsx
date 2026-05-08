import { IconPin, colors } from '@4play/ui';
import { Text, View } from 'react-native';
import type { DeckCard } from '../lib/swipe';
import { PhotoPlaceholder } from './PhotoPlaceholder';

const TONES = ['coral', 'green', 'ink', 'sand'] as const;

/**
 * Single swipe card matching pantalla 02 (design/screens.jsx).
 * Photos are still placeholder until Storage uploads ship.
 */
export function SwipeCard({ card }: { card: DeckCard }) {
  const tone = TONES[Math.abs(hash(card.id)) % TONES.length] ?? 'green';
  return (
    <View
      className="overflow-hidden"
      style={{
        flex: 1,
        borderRadius: 28,
        backgroundColor: colors.ink,
      }}
    >
      <PhotoPlaceholder tone={tone} style={{ flex: 1 }}>
        foto · {card.username}
      </PhotoPlaceholder>

      {/* gradient overlay */}
      <View
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(14,27,44,0.45)',
        }}
      />

      {/* level + distance pills */}
      <View
        className="absolute flex-row items-center gap-2"
        style={{ top: 16, left: 16, right: 16, justifyContent: 'space-between' }}
      >
        <View
          className="rounded-pill"
          style={{ backgroundColor: colors.lime, paddingHorizontal: 12, paddingVertical: 6 }}
        >
          <Text
            className="font-mono"
            style={{ color: colors.ink, fontSize: 10, letterSpacing: 0.6, fontWeight: '600' }}
          >
            NIVEL {card.level.toFixed(1)}
          </Text>
        </View>
        <View
          className="rounded-pill"
          style={{
            backgroundColor: 'rgba(14,27,44,0.55)',
            paddingHorizontal: 12,
            paddingVertical: 6,
          }}
        >
          <Text
            className="font-mono"
            style={{ color: colors.cream, fontSize: 10, letterSpacing: 0.6 }}
          >
            {card.distance_km.toFixed(1)} KM
          </Text>
        </View>
      </View>

      {/* info */}
      <View className="absolute" style={{ left: 22, right: 22, bottom: 22 }}>
        <Text
          className="font-display font-bold"
          style={{ color: colors.cream, fontSize: 32, letterSpacing: -0.96, lineHeight: 32 }}
        >
          {card.full_name}
        </Text>
        {card.neighborhood && (
          <View className="mt-1.5 flex-row items-center gap-1.5">
            <IconPin size={13} stroke={colors.cream} />
            <Text style={{ color: 'rgba(244,240,232,0.85)', fontSize: 13 }}>
              {card.neighborhood} · Cartagena
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

function hash(value: string): number {
  let h = 0;
  for (let i = 0; i < value.length; i++) h = (h * 31 + value.charCodeAt(i)) | 0;
  return h;
}
