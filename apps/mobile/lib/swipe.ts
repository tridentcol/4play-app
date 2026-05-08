import type { Sport } from '@4play/core';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useFilters } from './filters';
import { useProfile } from './profile';
import { supabase } from './supabase';

export type DeckCard = {
  id: string;
  username: string;
  full_name: string;
  photos: string[] | null;
  neighborhood: string | null;
  level: number;
  distance_km: number;
};

/**
 * Pulls nearby profiles via the `nearby_profiles` RPC, scoped to the
 * caller's location (read from their profile row) and the active filters.
 */
export function useSwipeDeck() {
  const filters = useFilters();
  const { data: me } = useProfile();
  const meLocation = me?.profile.location as unknown as
    | { coordinates?: [number, number] }
    | string
    | null
    | undefined;

  const coords = parseLocation(meLocation);

  return useQuery({
    queryKey: ['swipe-deck', filters, coords?.lat, coords?.lon],
    enabled: !!coords,
    queryFn: async (): Promise<DeckCard[]> => {
      if (!coords) return [];
      const { data, error } = await supabase.rpc('nearby_profiles', {
        p_lat: coords.lat,
        p_lon: coords.lon,
        p_radius_km: filters.radiusKm,
        p_sport: filters.sport,
        p_min_level: filters.minLevel,
        p_max_level: filters.maxLevel,
        p_limit: 30,
      });
      if (error) throw error;
      return (data ?? []) as DeckCard[];
    },
  });
}

function parseLocation(value: unknown): { lat: number; lon: number } | null {
  if (!value) return null;
  // PostGIS GeoJSON shape after select: { type: 'Point', coordinates: [lon, lat] }.
  if (typeof value === 'object' && value !== null && 'coordinates' in value) {
    const c = (value as { coordinates: [number, number] }).coordinates;
    return { lat: c[1], lon: c[0] };
  }
  // EWKT/WKT fallback "POINT(lon lat)".
  if (typeof value === 'string') {
    const m = value.match(/POINT\(([-\d.]+)\s+([-\d.]+)\)/);
    const lon = m?.[1];
    const lat = m?.[2];
    if (lon && lat) return { lat: Number.parseFloat(lat), lon: Number.parseFloat(lon) };
  }
  return null;
}

export type SwipeDirection = 'like' | 'dislike' | 'super';

export async function recordSwipe(args: {
  swiperId: string;
  swipedId: string;
  direction: SwipeDirection;
  sport: Sport;
}) {
  const { error } = await supabase.from('swipes').insert({
    swiper_id: args.swiperId,
    swiped_id: args.swipedId,
    direction: args.direction,
    sport_context: args.sport,
  });
  if (error) throw error;
}

/**
 * Subscribes to new matches involving `userId` and fires `onMatch` when
 * the SQL trigger inserts the row. Returns a cleanup function.
 */
export function useMatchListener(userId: string | undefined, onMatch: (matchId: string) => void) {
  const qc = useQueryClient();
  useEffect(() => {
    if (!userId) return;
    const channel = supabase
      .channel(`matches-${userId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'matches' },
        (payload) => {
          const row = payload.new as { id: string; profile_a: string; profile_b: string };
          if (row.profile_a === userId || row.profile_b === userId) {
            qc.invalidateQueries({ queryKey: ['matches', userId] });
            onMatch(row.id);
          }
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, onMatch, qc]);
}

export function useLastMatch() {
  const [matchId, setMatchId] = useState<string | null>(null);
  return { matchId, setMatchId, clear: () => setMatchId(null) };
}
