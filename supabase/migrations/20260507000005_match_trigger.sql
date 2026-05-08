-- =====================================================================
-- 4 PLAY · Match auto-detection trigger
-- When a like/super swipe is reciprocal, create a match + conversation.
-- =====================================================================
create or replace function on_swipe_like()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  reciprocal swipes%rowtype;
  new_match_id uuid;
begin
  if new.direction in ('like','super') then
    select * into reciprocal
    from swipes
    where swiper_id = new.swiped_id
      and swiped_id = new.swiper_id
      and direction in ('like','super');

    if found then
      insert into matches (profile_a, profile_b, sport)
      values (
        least(new.swiper_id, new.swiped_id),
        greatest(new.swiper_id, new.swiped_id),
        coalesce(new.sport_context, 'tennis')
      )
      on conflict (profile_a, profile_b) do nothing
      returning id into new_match_id;

      if new_match_id is not null then
        insert into conversations (match_id) values (new_match_id);
        -- Push notification fan-out is handled by Edge Function
        -- (Realtime subscription on inserts to matches/messages).
      end if;
    end if;
  end if;
  return new;
end;
$$;

create trigger trg_on_swipe_like after insert on swipes
  for each row execute function on_swipe_like();
