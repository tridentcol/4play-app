-- =====================================================================
-- 4 PLAY · PostGIS for geo queries (matchmaking by radius, nearby venues)
-- =====================================================================
create extension if not exists "postgis" with schema extensions;

alter table profiles add column location geography(POINT, 4326);
alter table venues   add column location geography(POINT, 4326);

create index idx_profiles_location on profiles using gist(location);
create index idx_venues_location   on venues   using gist(location);

-- =====================================================================
-- RPC: nearby_profiles
-- Returns active profiles within p_radius_km from (p_lat, p_lon),
-- filtered by sport + level range, excluding the caller and anyone
-- the caller has already swiped on.
-- =====================================================================
create or replace function public.nearby_profiles(
  p_lat double precision,
  p_lon double precision,
  p_radius_km double precision default 10,
  p_sport sport default 'tennis',
  p_min_level numeric default 1.0,
  p_max_level numeric default 7.0,
  p_limit int default 50
)
returns table (
  id uuid,
  username text,
  full_name text,
  photos text[],
  neighborhood text,
  level numeric,
  distance_km double precision
)
language sql
stable
set search_path = public, extensions
as $$
  select
    p.id, p.username, p.full_name, p.photos, p.neighborhood,
    ps.level,
    st_distance(p.location, st_makepoint(p_lon, p_lat)::geography) / 1000 as distance_km
  from profiles p
  join player_sports ps on ps.profile_id = p.id and ps.sport = p_sport
  where p.is_active
    and p.deleted_at is null
    and p.location is not null
    and ps.level between p_min_level and p_max_level
    and st_dwithin(p.location, st_makepoint(p_lon, p_lat)::geography, p_radius_km * 1000)
    and p.id != auth.uid()
    and not exists (
      select 1 from swipes s
      where s.swiper_id = auth.uid() and s.swiped_id = p.id
    )
  order by distance_km asc
  limit p_limit;
$$;

-- =====================================================================
-- RPC: nearby_venues
-- =====================================================================
create or replace function public.nearby_venues(
  p_lat double precision,
  p_lon double precision,
  p_radius_km double precision default 10,
  p_sport sport default null,
  p_limit int default 50
)
returns table (
  id uuid,
  slug text,
  name text,
  neighborhood text,
  photos text[],
  distance_km double precision,
  min_price int,
  has_sport boolean
)
language sql
stable
set search_path = public, extensions
as $$
  select
    v.id, v.slug, v.name, v.neighborhood, v.photos,
    st_distance(v.location, st_makepoint(p_lon, p_lat)::geography) / 1000 as distance_km,
    (select min(price_per_hour) from courts c where c.venue_id = v.id and c.is_active) as min_price,
    exists(select 1 from courts c where c.venue_id = v.id and (p_sport is null or c.sport = p_sport)) as has_sport
  from venues v
  where v.is_active
    and v.location is not null
    and st_dwithin(v.location, st_makepoint(p_lon, p_lat)::geography, p_radius_km * 1000)
  order by distance_km asc
  limit p_limit;
$$;
