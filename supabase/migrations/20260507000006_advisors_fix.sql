-- =====================================================================
-- 4 PLAY · Advisors fix — security + performance hardening
-- 1) Move pg_trgm out of public schema
-- 2) Rewrite RLS policies to use (select auth.uid()) instead of auth.uid()
--    so the function is evaluated once per query instead of per row
-- 3) Split `for all` policies into INSERT/UPDATE/DELETE so they don't
--    overlap with separate SELECT policies (multiple_permissive_policies)
-- 4) Add covering indexes for unindexed foreign keys
-- =====================================================================

-- 1) extensions schema --------------------------------------------------
alter extension pg_trgm set schema extensions;

-- 4) FK covering indexes -----------------------------------------------
create index if not exists idx_bookings_match     on bookings(match_id);
create index if not exists idx_matches_unmatch_by on matches(unmatched_by);
create index if not exists idx_messages_sender    on messages(sender_id);
create index if not exists idx_reports_message    on reports(message_id);
create index if not exists idx_reports_reporter   on reports(reporter_id);

-- 2 + 3) RLS policies — drop and recreate -------------------------------
-- profiles
drop policy if exists "profiles read public"   on profiles;
drop policy if exists "profiles update self"   on profiles;
drop policy if exists "profiles insert self"   on profiles;
create policy "profiles read public" on profiles for select
  using (deleted_at is null and is_active);
create policy "profiles update self" on profiles for update
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);
create policy "profiles insert self" on profiles for insert
  with check ((select auth.uid()) = id);

-- player_sports — split `for all` into write-only verbs
drop policy if exists "player_sports read all"   on player_sports;
drop policy if exists "player_sports write self" on player_sports;
create policy "player_sports read all" on player_sports for select using (true);
create policy "player_sports insert self" on player_sports for insert
  with check ((select auth.uid()) = profile_id);
create policy "player_sports update self" on player_sports for update
  using ((select auth.uid()) = profile_id)
  with check ((select auth.uid()) = profile_id);
create policy "player_sports delete self" on player_sports for delete
  using ((select auth.uid()) = profile_id);

-- swipes
drop policy if exists "swipes read self"   on swipes;
drop policy if exists "swipes insert self" on swipes;
create policy "swipes read self" on swipes for select
  using ((select auth.uid()) = swiper_id);
create policy "swipes insert self" on swipes for insert
  with check ((select auth.uid()) = swiper_id);

-- matches
drop policy if exists "matches read participant"   on matches;
drop policy if exists "matches update participant" on matches;
create policy "matches read participant" on matches for select
  using ((select auth.uid()) in (profile_a, profile_b));
create policy "matches update participant" on matches for update
  using ((select auth.uid()) in (profile_a, profile_b))
  with check ((select auth.uid()) in (profile_a, profile_b));

-- conversations
drop policy if exists "conversations read participant" on conversations;
create policy "conversations read participant" on conversations for select
  using (exists (
    select 1 from matches m
    where m.id = conversations.match_id
      and (select auth.uid()) in (m.profile_a, m.profile_b)
  ));

-- messages
drop policy if exists "messages read participant"   on messages;
drop policy if exists "messages insert participant" on messages;
drop policy if exists "messages update participant" on messages;
create policy "messages read participant" on messages for select
  using (exists (
    select 1 from conversations c
    join matches m on m.id = c.match_id
    where c.id = messages.conversation_id
      and (select auth.uid()) in (m.profile_a, m.profile_b)
  ));
create policy "messages insert participant" on messages for insert
  with check (
    (select auth.uid()) = sender_id
    and exists (
      select 1 from conversations c
      join matches m on m.id = c.match_id
      where c.id = messages.conversation_id
        and (select auth.uid()) in (m.profile_a, m.profile_b)
    )
  );
create policy "messages update participant" on messages for update
  using (
    exists (
      select 1 from conversations c
      join matches m on m.id = c.match_id
      where c.id = messages.conversation_id
        and (select auth.uid()) in (m.profile_a, m.profile_b)
    )
  )
  with check (
    exists (
      select 1 from conversations c
      join matches m on m.id = c.match_id
      where c.id = messages.conversation_id
        and (select auth.uid()) in (m.profile_a, m.profile_b)
    )
  );

-- bookings — split `for all` so SELECT only comes from "read involved"
drop policy if exists "bookings read involved" on bookings;
drop policy if exists "bookings write self"    on bookings;
create policy "bookings read involved" on bookings for select
  using ((select auth.uid()) = booker_id or (select auth.uid()) = any(participants));
create policy "bookings insert self" on bookings for insert
  with check ((select auth.uid()) = booker_id);
create policy "bookings update self" on bookings for update
  using ((select auth.uid()) = booker_id)
  with check ((select auth.uid()) = booker_id);
create policy "bookings delete self" on bookings for delete
  using ((select auth.uid()) = booker_id);

-- payments / subscriptions
drop policy if exists "payments read self"      on payments;
drop policy if exists "subscriptions read self" on subscriptions;
create policy "payments read self" on payments for select
  using ((select auth.uid()) = profile_id);
create policy "subscriptions read self" on subscriptions for select
  using ((select auth.uid()) = profile_id);

-- push_tokens — split `for all`
drop policy if exists "push_tokens write self" on push_tokens;
create policy "push_tokens read self" on push_tokens for select
  using ((select auth.uid()) = profile_id);
create policy "push_tokens insert self" on push_tokens for insert
  with check ((select auth.uid()) = profile_id);
create policy "push_tokens update self" on push_tokens for update
  using ((select auth.uid()) = profile_id)
  with check ((select auth.uid()) = profile_id);
create policy "push_tokens delete self" on push_tokens for delete
  using ((select auth.uid()) = profile_id);

-- reports
drop policy if exists "reports insert self" on reports;
drop policy if exists "reports read self"   on reports;
create policy "reports insert self" on reports for insert
  with check ((select auth.uid()) = reporter_id);
create policy "reports read self" on reports for select
  using ((select auth.uid()) = reporter_id);
