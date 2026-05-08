import { track } from '@4play/core';
import { IconBolt, IconFilter, IconHeart, IconX, LogoMark, colors } from '@4play/ui';
import { Link, router } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MatchModal } from '../../components/MatchModal';
import { SwipeCard } from '../../components/SwipeCard';
import { useAuthState } from '../../lib/auth';
import { useFilters } from '../../lib/filters';
import { useProfile } from '../../lib/profile';
import {
  type DeckCard,
  type SwipeDirection,
  recordSwipe,
  useMatchListener,
  useSwipeDeck,
} from '../../lib/swipe';

export default function Swipe() {
  const auth = useAuthState();
  const userId = auth.status === 'authenticated' ? auth.session.user.id : undefined;
  const { data: cards, isLoading, refetch } = useSwipeDeck();
  const { data: me } = useProfile();
  const filters = useFilters();
  const [index, setIndex] = useState(0);
  const [latestMatch, setLatestMatch] = useState<string | null>(null);

  const onMatch = useCallback((matchId: string) => {
    setLatestMatch(matchId);
    track('match_created', { match_id: matchId });
  }, []);
  useMatchListener(userId, onMatch);

  const current: DeckCard | undefined = cards?.[index];
  const next: DeckCard | undefined = cards?.[index + 1];

  const swipe = async (direction: SwipeDirection) => {
    if (!current || !userId) return;
    setIndex((i) => i + 1);
    track('swipe', { direction, sport: filters.sport, swiped_id: current.id });
    try {
      await recordSwipe({
        swiperId: userId,
        swipedId: current.id,
        direction,
        sport: filters.sport,
      });
    } catch (e) {
      Alert.alert('Error', e instanceof Error ? e.message : 'No pudimos guardar tu swipe');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-cream" edges={['top']}>
      <View className="flex-row items-center justify-between px-5 pb-3.5 pt-3">
        <LogoMark size={32} />
        <View className="flex-row gap-2">
          <Link href="/(modals)/filters" asChild>
            <Pressable
              className="items-center justify-center rounded-pill"
              style={{
                width: 38,
                height: 38,
                backgroundColor: colors.bone,
                borderColor: colors.line,
                borderWidth: 1,
              }}
            >
              <IconFilter size={18} stroke={colors.ink} />
            </Pressable>
          </Link>
        </View>
      </View>

      <View className="px-5 pb-3 flex-row gap-2">
        <SportPill sport="tennis" />
        <SportPill sport="padel" />
      </View>

      <View className="flex-1 px-5">
        {isLoading && (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator color={colors.court} />
          </View>
        )}
        {!isLoading && !me?.profile.location && (
          <Empty
            title="Activa tu ubicación"
            body="Necesitamos saber dónde juegas para encontrar rivales cerca."
          />
        )}
        {!isLoading &&
          !!me?.profile.location &&
          (!cards || cards.length === 0 || index >= cards.length) && (
            <Empty
              title="No hay más jugadores cerca"
              body="Prueba aumentar el radio o cambiar de deporte en filtros."
              onRefresh={() => {
                setIndex(0);
                void refetch();
              }}
            />
          )}
        {current && (
          <View className="flex-1" style={{ position: 'relative' }}>
            {next && (
              <View
                style={{
                  position: 'absolute',
                  inset: 0,
                  paddingHorizontal: 12,
                  paddingBottom: 12,
                  opacity: 0.7,
                  transform: [{ translateY: 8 }, { scale: 0.96 }],
                }}
              >
                <SwipeCard card={next} />
              </View>
            )}
            <SwipeCard card={current} />
          </View>
        )}
      </View>

      <View className="px-5 py-5 flex-row items-center justify-center gap-4">
        <ActionBtn
          bg={colors.bone}
          border={colors.line}
          onPress={() => void swipe('dislike')}
          disabled={!current}
        >
          <IconX size={22} stroke={colors.ink} />
        </ActionBtn>
        <ActionBtn
          bg={colors.ink}
          size={68}
          onPress={() => void swipe('super')}
          disabled={!current}
        >
          <IconBolt size={26} stroke={colors.lime} fill={colors.lime} />
        </ActionBtn>
        <ActionBtn bg={colors.lime} onPress={() => void swipe('like')} disabled={!current}>
          <IconHeart size={22} stroke={colors.ink} fill={colors.ink} />
        </ActionBtn>
      </View>

      <MatchModal
        visible={!!latestMatch}
        onChat={() => {
          setLatestMatch(null);
          router.push('/(tabs)/chat');
        }}
        onContinue={() => setLatestMatch(null)}
      />
    </SafeAreaView>
  );
}

function SportPill({ sport }: { sport: 'tennis' | 'padel' }) {
  const filters = useFilters();
  const active = filters.sport === sport;
  return (
    <Pressable
      onPress={() => filters.set({ sport })}
      className="rounded-pill px-4 py-2"
      style={{
        backgroundColor: active ? colors.ink : 'transparent',
        borderColor: active ? colors.ink : colors.line,
        borderWidth: 1,
      }}
    >
      <Text
        className="font-body font-medium"
        style={{ color: active ? colors.cream : colors.ash, fontSize: 13 }}
      >
        {sport === 'tennis' ? 'Tenis' : 'Pádel'}
      </Text>
    </Pressable>
  );
}

function ActionBtn({
  children,
  bg,
  border,
  size = 56,
  onPress,
  disabled,
}: {
  children: React.ReactNode;
  bg: string;
  border?: string;
  size?: number;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className="items-center justify-center"
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        backgroundColor: bg,
        borderColor: border,
        borderWidth: border ? 1 : 0,
        opacity: disabled ? 0.4 : 1,
        shadowColor: '#0E1B2C',
        shadowOpacity: 0.12,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 18,
      }}
    >
      {children}
    </Pressable>
  );
}

function Empty({
  title,
  body,
  onRefresh,
}: {
  title: string;
  body: string;
  onRefresh?: () => void;
}) {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-display font-bold text-display-xs text-ink text-center">{title}</Text>
      <Text className="mt-2 max-w-[280px] text-body-s text-ash text-center">{body}</Text>
      {onRefresh && (
        <Pressable
          onPress={onRefresh}
          className="mt-6 rounded-pill px-5 py-3"
          style={{ backgroundColor: colors.court }}
        >
          <Text className="text-cream font-body font-semibold">Refrescar</Text>
        </Pressable>
      )}
    </View>
  );
}
