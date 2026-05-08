import type { Tables } from '@4play/db';
import { useQuery } from '@tanstack/react-query';
import { useFilters } from './filters';
import { useProfile } from './profile';
import { supabase } from './supabase';

export type Venue = Tables<'venues'>;
export type Court = Tables<'courts'>;

export type NearbyVenue = {
  id: string;
  slug: string;
  name: string;
  neighborhood: string | null;
  photos: string[] | null;
  distance_km: number;
  min_price: number | null;
  has_sport: boolean;
};

const CARTAGENA = { lat: 10.4051, lon: -75.5358 };

/**
 * Pulls nearby venues via the `nearby_venues` RPC. Falls back to
 * Cartagena city center when the user hasn't shared their location yet,
 * so the list is still useful before location permission is granted.
 */
export function useNearbyVenues() {
  const filters = useFilters();
  const { data: me } = useProfile();
  const meLoc = me?.profile.location as unknown as
    | { coordinates?: [number, number] }
    | string
    | null
    | undefined;
  const coords = parseLocation(meLoc) ?? CARTAGENA;

  return useQuery({
    queryKey: ['nearby-venues', filters.sport, filters.radiusKm, coords.lat, coords.lon],
    queryFn: async (): Promise<NearbyVenue[]> => {
      const { data, error } = await supabase.rpc('nearby_venues', {
        p_lat: coords.lat,
        p_lon: coords.lon,
        p_radius_km: filters.radiusKm,
        p_sport: filters.sport,
        p_limit: 50,
      });
      if (error) throw error;
      return (data ?? []) as NearbyVenue[];
    },
  });
}

export function useVenue(venueId: string | undefined) {
  return useQuery({
    queryKey: ['venue', venueId],
    enabled: !!venueId,
    queryFn: async (): Promise<{ venue: Venue; courts: Court[] } | null> => {
      if (!venueId) return null;
      const [v, c] = await Promise.all([
        supabase.from('venues').select('*').eq('id', venueId).maybeSingle(),
        supabase.from('courts').select('*').eq('venue_id', venueId).order('name'),
      ]);
      if (v.error) throw v.error;
      if (c.error) throw c.error;
      if (!v.data) return null;
      return { venue: v.data, courts: c.data ?? [] };
    },
  });
}

function parseLocation(value: unknown): { lat: number; lon: number } | null {
  if (!value) return null;
  if (typeof value === 'object' && value !== null && 'coordinates' in value) {
    const c = (value as { coordinates: [number, number] }).coordinates;
    return { lat: c[1], lon: c[0] };
  }
  if (typeof value === 'string') {
    const m = value.match(/POINT\(([-\d.]+)\s+([-\d.]+)\)/);
    const lon = m?.[1];
    const lat = m?.[2];
    if (lon && lat) return { lat: Number.parseFloat(lat), lon: Number.parseFloat(lon) };
  }
  return null;
}
