-- =====================================================================
-- 4 PLAY · Row Level Security — every table in public has RLS enabled
-- =====================================================================

alter table profiles        enable row level security;
alter table player_sports   enable row level security;
alter table venues          enable row level security;
alter table courts          enable row level security;
alter table swipes          enable row level security;
alter table matches         enable row level security;
alter table conversations   enable row level security;
alter table messages        enable row level security;
alter table bookings        enable row level security;
alter table payments        enable row level security;
alter table subscriptions   enable row level security;
alter table push_tokens     enable row level security;
alter table reports         enable row level security;

-- ---------------------------------------------------------------------
-- profiles: public read of active profiles, self update/insert
-- ---------------------------------------------------------------------
create policy "profiles read public" on profiles for select
  using (deleted_at is null and is_active);
create policy "profiles update self" on profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);
create policy "profiles insert self" on profiles for insert
  with check (auth.uid() = id);

-- ---------------------------------------------------------------------
-- player_sports
-- ---------------------------------------------------------------------
create policy "player_sports read all" on player_sports for select using (true);
create policy "player_sports write self" on player_sports for all
  using (auth.uid() = profile_id) with check (auth.uid() = profile_id);

-- ---------------------------------------------------------------------
-- venues / courts: public read, writes via service role only
-- ---------------------------------------------------------------------
create policy "venues read public" on venues for select using (is_active);
create policy "courts read public" on courts for select using (is_active);

-- ---------------------------------------------------------------------
-- swipes: only see and create your own
-- ---------------------------------------------------------------------
create policy "swipes read self" on swipes for select using (auth.uid() = swiper_id);
create policy "swipes insert self" on swipes for insert with check (auth.uid() = swiper_id);

-- ---------------------------------------------------------------------
-- matches: only participants
-- ---------------------------------------------------------------------
create policy "matches read participant" on matches for select
  using (auth.uid() in (profile_a, profile_b));
create policy "matches update participant" on matches for update
  using (auth.uid() in (profile_a, profile_b))
  with check (auth.uid() in (profile_a, profile_b));

-- ---------------------------------------------------------------------
-- conversations: participants only via match
-- ---------------------------------------------------------------------
create policy "conversations read participant" on conversations for select
  using (exists (
    select 1 from matches m
    where m.id = conversations.match_id
      and auth.uid() in (m.profile_a, m.profile_b)
  ));

-- ---------------------------------------------------------------------
-- messages: read if I belong to the conversation; insert as sender
-- ---------------------------------------------------------------------
create policy "messages read participant" on messages for select
  using (exists (
    select 1 from conversations c
    join matches m on m.id = c.match_id
    where c.id = messages.conversation_id
      and auth.uid() in (m.profile_a, m.profile_b)
  ));
create policy "messages insert participant" on messages for insert
  with check (
    auth.uid() = sender_id
    and exists (
      select 1 from conversations c
      join matches m on m.id = c.match_id
      where c.id = messages.conversation_id
        and auth.uid() in (m.profile_a, m.profile_b)
    )
  );
create policy "messages update participant" on messages for update
  using (
    exists (
      select 1 from conversations c
      join matches m on m.id = c.match_id
      where c.id = messages.conversation_id
        and auth.uid() in (m.profile_a, m.profile_b)
    )
  )
  with check (
    exists (
      select 1 from conversations c
      join matches m on m.id = c.match_id
      where c.id = messages.conversation_id
        and auth.uid() in (m.profile_a, m.profile_b)
    )
  );

-- ---------------------------------------------------------------------
-- bookings: booker + participants read; booker writes
-- ---------------------------------------------------------------------
create policy "bookings read involved" on bookings for select
  using (auth.uid() = booker_id or auth.uid() = any(participants));
create policy "bookings write self" on bookings for all
  using (auth.uid() = booker_id) with check (auth.uid() = booker_id);

-- ---------------------------------------------------------------------
-- payments / subscriptions: owner-only read; writes via Edge Functions
-- (service role bypasses RLS)
-- ---------------------------------------------------------------------
create policy "payments read self" on payments for select using (auth.uid() = profile_id);
create policy "subscriptions read self" on subscriptions for select using (auth.uid() = profile_id);

-- ---------------------------------------------------------------------
-- push_tokens
-- ---------------------------------------------------------------------
create policy "push_tokens write self" on push_tokens for all
  using (auth.uid() = profile_id) with check (auth.uid() = profile_id);

-- ---------------------------------------------------------------------
-- reports: insert as reporter, read your own
-- ---------------------------------------------------------------------
create policy "reports insert self" on reports for insert with check (auth.uid() = reporter_id);
create policy "reports read self" on reports for select using (auth.uid() = reporter_id);
