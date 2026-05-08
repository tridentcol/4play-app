-- =====================================================================
-- 4 PLAY · Seed of public demo venues for Cartagena
-- (constructor must extend with courts in seed.sql or follow-up migration)
-- =====================================================================
insert into venues (slug, name, neighborhood, address, location, photos, amenities, opening_hours, is_partner) values
  ('club-cartagena',     'Club Cartagena',     'Manga',       'Cra 17 #25-30',  st_makepoint(-75.5358, 10.4051)::geography, '{}', '{parking,showers}', '{"mon":["6:00-22:00"]}'::jsonb, true),
  ('karibana-beach',     'Karibana Beach',     'Manzanillo',  'Vía Manzanillo', st_makepoint(-75.4520, 10.5081)::geography, '{}', '{parking,beach}',   '{"mon":["6:00-21:00"]}'::jsonb, true),
  ('las-velas-padel',    'Las Velas Pádel',    'Bocagrande',  'Av San Martín',  st_makepoint(-75.5556, 10.4001)::geography, '{}', '{parking}',         '{"mon":["7:00-22:00"]}'::jsonb, true),
  ('hotel-las-americas', 'Hotel Las Américas', 'Anillo Vial', 'Anillo Vial',    st_makepoint(-75.4910, 10.4500)::geography, '{}', '{parking,pool}',    '{"mon":["6:00-22:00"]}'::jsonb, true);

-- Demo courts per venue (mix tennis + padel) so nearby_venues.has_sport works
insert into courts (venue_id, name, sport, surface, is_indoor, has_lighting, price_per_hour)
select v.id, c.name, c.sport, c.surface, c.is_indoor, c.has_lighting, c.price_per_hour
from venues v
cross join lateral (
  values
    ('Cancha 1', 'tennis'::sport, 'clay'::surface_type, false, true, 6000000),
    ('Cancha 2', 'tennis'::sport, 'hard'::surface_type, false, true, 5500000),
    ('Pádel A',  'padel'::sport,  'crystal'::surface_type, true, true, 7500000),
    ('Pádel B',  'padel'::sport,  'crystal'::surface_type, true, true, 7500000)
) as c(name, sport, surface, is_indoor, has_lighting, price_per_hour)
where v.slug in ('club-cartagena','karibana-beach','las-velas-padel','hotel-las-americas');
