-- =====================================================================
-- 4 PLAY · User blocks + nearby_profiles exclusion
-- =====================================================================

create table if not exists blocks (
  id uuid primary key default gen_random_uuid(),
  blocker_id uuid not null references profiles(id) on delete cascade,
  blocked_id uuid not null references profiles(id) on delete cascade,
  reason text,
  created_at timestamptz default now(),
  unique(blocker_id, blocked_id),
  check (blocker_id != blocked_id)
);

create index if not exists idx_blocks_blocker on blocks(blocker_id);
create index if not exists idx_blocks_blocked on blocks(blocked_id);

alter table blocks enable row level security;

create policy "blocks read self" on blocks for select
  using ((select auth.uid()) = blocker_id);
create policy "blocks insert self" on blocks for insert
  with check ((select auth.uid()) = blocker_id);
create policy "blocks delete self" on blocks for delete
  using ((select auth.uid()) = blocker_id);

-- Refresh nearby_profiles to also exclude blocked users (in either direction).
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
    and not exists (
      select 1 from blocks b
      where (b.blocker_id = auth.uid() and b.blocked_id = p.id)
         or (b.blocker_id = p.id and b.blocked_id = auth.uid())
    )
  order by distance_km asc
  limit p_limit;
$$;
