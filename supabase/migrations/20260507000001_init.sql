-- =====================================================================
-- 4 PLAY · INITIAL SCHEMA
-- =====================================================================

-- Extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";

-- Custom types
create type sport as enum ('tennis', 'padel');
create type swipe_direction as enum ('like', 'dislike', 'super');
create type booking_status as enum ('pending','confirmed','cancelled','completed');
create type payment_status as enum ('PENDING','APPROVED','DECLINED','VOIDED','ERROR');
create type subscription_status as enum ('trialing','active','past_due','cancelled','expired');
create type report_reason as enum ('spam','harassment','fake','inappropriate_content','other');
create type report_status as enum ('pending','reviewed','actioned','dismissed');
create type gender_type as enum ('male','female','other','prefer_not');
create type surface_type as enum ('clay','hard','grass','crystal','resin');

-- =====================================================================
-- profiles
-- =====================================================================
create table profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  username      text unique not null,
  full_name     text not null,
  birthdate     date,
  gender        gender_type,
  bio           text check (char_length(bio) <= 280),
  city          text default 'Cartagena',
  neighborhood  text,
  -- location is added in 20260507000002_postgis.sql
  photos        text[] default '{}',
  primary_photo_idx int default 0,
  availability  jsonb default '{}'::jsonb,
  favorite_venues uuid[] default '{}',
  is_verified   boolean default false,
  is_active     boolean default true,
  last_seen_at  timestamptz default now(),
  created_at    timestamptz default now(),
  updated_at    timestamptz default now(),
  deleted_at    timestamptz
);

create index idx_profiles_username on profiles(username);
create index idx_profiles_city on profiles(city) where deleted_at is null;
create index idx_profiles_active on profiles(is_active) where deleted_at is null;

-- =====================================================================
-- player_sports
-- =====================================================================
create table player_sports (
  id            uuid primary key default gen_random_uuid(),
  profile_id    uuid not null references profiles(id) on delete cascade,
  sport         sport not null,
  level         numeric(2,1) not null check (level between 1.0 and 7.0),
  years_playing int default 0,
  is_primary    boolean default false,
  created_at    timestamptz default now(),
  unique(profile_id, sport)
);

create index idx_player_sports_profile on player_sports(profile_id);
create index idx_player_sports_sport_level on player_sports(sport, level);

-- =====================================================================
-- venues + courts
-- =====================================================================
create table venues (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  name          text not null,
  description   text,
  city          text not null default 'Cartagena',
  neighborhood  text,
  address       text,
  -- location added in 20260507000002_postgis.sql
  phone         text,
  photos        text[] default '{}',
  amenities     text[] default '{}',
  opening_hours jsonb default '{}'::jsonb,
  is_partner    boolean default false,
  is_active     boolean default true,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

create index idx_venues_slug on venues(slug);
create index idx_venues_city on venues(city) where is_active;

create table courts (
  id              uuid primary key default gen_random_uuid(),
  venue_id        uuid not null references venues(id) on delete cascade,
  name            text not null,
  sport           sport not null,
  surface         surface_type,
  is_indoor       boolean default false,
  has_lighting    boolean default false,
  price_per_hour  int not null check (price_per_hour >= 0),
  is_active       boolean default true,
  created_at      timestamptz default now()
);

create index idx_courts_venue on courts(venue_id);
create index idx_courts_sport on courts(sport, is_active);

-- =====================================================================
-- swipes / matches / conversations / messages
-- =====================================================================
create table swipes (
  id           uuid primary key default gen_random_uuid(),
  swiper_id    uuid not null references profiles(id) on delete cascade,
  swiped_id    uuid not null references profiles(id) on delete cascade,
  direction    swipe_direction not null,
  sport_context sport,
  created_at   timestamptz default now(),
  unique(swiper_id, swiped_id),
  check (swiper_id != swiped_id)
);

create index idx_swipes_swiper on swipes(swiper_id, created_at desc);
create index idx_swipes_swiped on swipes(swiped_id, direction);

create table matches (
  id           uuid primary key default gen_random_uuid(),
  profile_a    uuid not null references profiles(id) on delete cascade,
  profile_b    uuid not null references profiles(id) on delete cascade,
  sport        sport not null,
  created_at   timestamptz default now(),
  unmatched_at timestamptz,
  unmatched_by uuid references profiles(id),
  check (profile_a < profile_b),
  unique (profile_a, profile_b)
);

create index idx_matches_a on matches(profile_a) where unmatched_at is null;
create index idx_matches_b on matches(profile_b) where unmatched_at is null;

create table conversations (
  id                    uuid primary key default gen_random_uuid(),
  match_id              uuid not null references matches(id) on delete cascade unique,
  last_message_at       timestamptz default now(),
  last_message_preview  text,
  created_at            timestamptz default now()
);

create index idx_conversations_match on conversations(match_id);
create index idx_conversations_recent on conversations(last_message_at desc);

create table messages (
  id              uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  sender_id       uuid not null references profiles(id) on delete cascade,
  body            text not null check (char_length(body) <= 2000),
  attachments     jsonb default '[]'::jsonb,
  read_at         timestamptz,
  created_at      timestamptz default now()
);

create index idx_messages_conversation on messages(conversation_id, created_at desc);
create index idx_messages_unread on messages(conversation_id) where read_at is null;

-- =====================================================================
-- bookings + payments
-- =====================================================================
create table bookings (
  id            uuid primary key default gen_random_uuid(),
  court_id      uuid not null references courts(id),
  booker_id     uuid not null references profiles(id),
  participants  uuid[] default '{}',
  start_at      timestamptz not null,
  end_at        timestamptz not null,
  status        booking_status default 'pending',
  total_amount  int not null,
  platform_fee  int not null default 0,
  match_id      uuid references matches(id),
  notes         text,
  created_at    timestamptz default now(),
  cancelled_at  timestamptz,
  check (end_at > start_at)
);

create index idx_bookings_court_time on bookings(court_id, start_at);
create index idx_bookings_booker on bookings(booker_id, created_at desc);
create index idx_bookings_status on bookings(status);

create table payments (
  id                    uuid primary key default gen_random_uuid(),
  profile_id            uuid not null references profiles(id),
  amount                int not null,
  currency              text default 'COP' not null,
  purpose               text not null check (purpose in ('subscription','booking')),
  reference_id          uuid not null,
  wompi_transaction_id  text unique,
  wompi_status          payment_status default 'PENDING',
  payment_method        text,
  raw_response          jsonb,
  created_at            timestamptz default now(),
  updated_at            timestamptz default now()
);

create index idx_payments_profile on payments(profile_id);
create index idx_payments_reference on payments(reference_id);
create index idx_payments_wompi_id on payments(wompi_transaction_id);

-- =====================================================================
-- subscriptions
-- =====================================================================
create table subscriptions (
  id                       uuid primary key default gen_random_uuid(),
  profile_id               uuid not null references profiles(id) on delete cascade unique,
  status                   subscription_status default 'trialing',
  plan                     text default 'monthly_basic',
  trial_ends_at            timestamptz,
  current_period_start     timestamptz default now(),
  current_period_end       timestamptz,
  wompi_subscription_id    text,
  cancel_at_period_end     boolean default false,
  created_at               timestamptz default now(),
  updated_at               timestamptz default now()
);

create index idx_subscriptions_status on subscriptions(status);

-- =====================================================================
-- push_tokens + reports
-- =====================================================================
create table push_tokens (
  id          uuid primary key default gen_random_uuid(),
  profile_id  uuid not null references profiles(id) on delete cascade,
  token       text not null,
  platform    text not null check (platform in ('ios','android')),
  device_id   text,
  created_at  timestamptz default now(),
  unique(profile_id, token)
);

create index idx_push_tokens_profile on push_tokens(profile_id);

create table reports (
  id           uuid primary key default gen_random_uuid(),
  reporter_id  uuid not null references profiles(id),
  reported_id  uuid not null references profiles(id),
  reason       report_reason not null,
  context      text,
  message_id   uuid references messages(id),
  status       report_status default 'pending',
  created_at   timestamptz default now(),
  check (reporter_id != reported_id)
);

create index idx_reports_status on reports(status);
create index idx_reports_reported on reports(reported_id);

-- =====================================================================
-- updated_at trigger fn
-- =====================================================================
create or replace function set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_profiles_updated_at before update on profiles
  for each row execute function set_updated_at();
create trigger trg_venues_updated_at before update on venues
  for each row execute function set_updated_at();
create trigger trg_payments_updated_at before update on payments
  for each row execute function set_updated_at();
create trigger trg_subscriptions_updated_at before update on subscriptions
  for each row execute function set_updated_at();
