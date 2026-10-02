-- Human Warriors / Human Divas — Supabase schema
-- Run this once in the Supabase SQL editor (or via `supabase db push`)
-- against a fresh project. Safe to re-run: guarded with `if not exists`
-- / `drop ... if exists` where practical.

create extension if not exists "pgcrypto";

do $$ begin
  create type team_slug as enum ('warriors', 'divas');
exception
  when duplicate_object then null;
end $$;

-- ---------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------

create table if not exists public.players (
  id uuid primary key default gen_random_uuid(),
  team team_slug not null,
  num integer not null,
  name text not null,
  pos text not null,
  short text not null,
  h integer not null,
  w integer not null,
  age integer not null,
  home text not null,
  ppg numeric(5, 1) not null default 0,
  rpg numeric(5, 1) not null default 0,
  apg numeric(5, 1) not null default 0,
  fg numeric(5, 1) not null default 0,
  bio text not null default '',
  sort_order integer not null default 0,
  img text,
  created_at timestamptz not null default now()
);

-- Safe to re-run against a players table created before `img` existed.
alter table public.players add column if not exists img text;

create table if not exists public.coaches (
  id uuid primary key default gen_random_uuid(),
  team team_slug not null,
  name text not null,
  role text not null,
  initials text not null,
  bio text not null default '',
  sort_order integer not null default 0,
  img text,
  created_at timestamptz not null default now()
);

-- Safe to re-run against a coaches table created before `img` existed.
alter table public.coaches add column if not exists img text;

-- News is shared across both Human Warriors and Human Divas — there is
-- no `team` column; every row shows on both sites.
create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  featured boolean not null default false,
  tag text not null,
  date date not null default current_date,
  title text not null,
  excerpt text not null,
  body text,
  img text,
  created_at timestamptz not null default now()
);

create index if not exists players_team_idx on public.players (team, sort_order);
create index if not exists coaches_team_idx on public.coaches (team, sort_order);
create index if not exists news_date_idx on public.news (date desc);

-- ---------------------------------------------------------------------
-- Row Level Security
-- Anyone (including anonymous visitors) can read. Only signed-in users
-- (the admin panel's Supabase Auth users) can write. There is no public
-- sign-up flow in the app — create admin users from the Supabase
-- dashboard under Authentication > Users.
-- ---------------------------------------------------------------------

alter table public.players enable row level security;
alter table public.coaches enable row level security;
alter table public.news enable row level security;

drop policy if exists "Public can read players" on public.players;
create policy "Public can read players" on public.players
  for select using (true);

drop policy if exists "Authenticated can write players" on public.players;
create policy "Authenticated can write players" on public.players
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "Public can read coaches" on public.coaches;
create policy "Public can read coaches" on public.coaches
  for select using (true);

drop policy if exists "Authenticated can write coaches" on public.coaches;
create policy "Authenticated can write coaches" on public.coaches
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "Public can read news" on public.news;
create policy "Public can read news" on public.news
  for select using (true);

drop policy if exists "Authenticated can write news" on public.news;
create policy "Authenticated can write news" on public.news
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ---------------------------------------------------------------------
-- Seed data — mirrors the rosters/coaches/news that were previously
-- hardcoded in app/components/site-data.ts, so the site looks the same
-- the moment it's wired up to Supabase.
-- ---------------------------------------------------------------------

insert into public.players (team, num, name, pos, short, h, w, age, home, ppg, rpg, apg, fg, bio, sort_order) values
  ('warriors', 31, 'G. Nasanjargal', 'Point Guard', 'PG', 185, 78, 24, 'Ulaanbaatar', 16.4, 3.1, 6.8, 44, 'The engine of the offense. Bat-Erdene leads the league in assist-to-turnover ratio and sets the defensive tone every possession he''s on the floor.', 0),
  ('warriors', 5, 'B. Tuvshinbayar', 'Shooting Guard', 'SG', 190, 85, 26, 'Ulaanbaatar', 19.8, 4, 2.6, 47, 'The league''s premier movement shooter. Tuvshinbayar runs off a wall of screens and rarely misses when his feet are set.', 1),
  ('warriors', 8, 'D. Munkhbat', 'Small Forward', 'SF', 196, 92, 27, 'Darkhan', 14.1, 6.3, 2.1, 45, 'A relentless two-way wing who guards every position one through four and never takes a possession off.', 2),
  ('warriors', 10, 'Ts. Ariunbold', 'Power Forward', 'PF', 201, 98, 29, 'Erdenet', 12.7, 8.9, 1.4, 51, 'A bruising interior scorer who out-works bigger opponents on the offensive glass every single night.', 3),
  ('warriors', 12, 'O. Chinguun', 'Center', 'C', 206, 104, 25, 'Ulaanbaatar', 10.5, 11.2, 1, 58, 'The rim protector anchoring the league''s top-rated defense, altering shots at the basket all season long.', 4),
  ('warriors', 15, 'N. Batbayar', 'Point Guard', 'PG', 182, 76, 23, 'Choibalsan', 8.9, 2.4, 5.7, 41, 'The backup floor general, pushing pace off the bench and keeping the second unit organized.', 5),
  ('warriors', 21, 'G. Khüslen', 'Shooting Guard', 'SG', 188, 80, 22, 'Ulaanbaatar', 13.6, 3.2, 2.9, 44, 'A fearless attacker off the bounce who gets to the free-throw line more than anyone else on the roster.', 6),
  ('warriors', 23, 'B. Sainbayar', 'Small Forward', 'SF', 193, 88, 28, 'Mörön', 11.9, 5.4, 2.3, 43, 'A steady veteran wing who does the dirty work, from boxing out to taking the toughest defensive assignment.', 7),
  ('warriors', 33, 'T. Ganzorig', 'Power Forward', 'PF', 199, 95, 30, 'Ulaanbaatar', 9.4, 7.8, 1.1, 49, 'The locker room''s longest-tenured Warrior, setting the physical tone up front every game of the season.', 8),
  ('warriors', 44, 'Ch. Otgonbayar', 'Center', 'C', 208, 107, 31, 'Khovd', 8.1, 9.6, 0.8, 55, 'A towering backup center who changes the complexion of the paint the moment he checks into the game.', 9),
  ('warriors', 7, 'J. Enkhbat', 'Shooting Guard', 'G', 184, 79, 21, 'Ulaanbaatar', 7.3, 2.1, 3.4, 40, 'The youngest Warrior on the roster, a high-energy rookie earning minutes with his defensive effort.', 10),
  ('divas', 7, 'B. Altantsetseg', 'Shooting Guard', 'SG', 178, 66, 23, 'Ulaanbaatar', 18.2, 4.3, 3.1, 46, 'A pure scorer with range to the arc. Altantsetseg carries the Divas'' halfcourt offense and closes games at the line.', 0),
  ('divas', 11, 'O. Erdenetsetseg', 'Point Guard', 'PG', 170, 60, 21, 'Erdenet', 11.6, 2.8, 7.9, 41, 'The floor general. Erdenetsetseg''s court vision leads the league in assists per 36 minutes for a rookie.', 1),
  ('divas', 23, 'T. Munkhzul', 'Center', 'C', 188, 79, 26, 'Darkhan', 14.9, 10.4, 1.6, 52, 'A double-double threat every night. Munkhzul anchors the paint on both ends and leads the Divas in rebounding.', 2),
  ('divas', 4, 'S. Uranchimeg', 'Small Forward', 'SF', 175, 64, 24, 'Ulaanbaatar', 13.4, 5.7, 2.4, 44, 'A two-way wing who guards the opponent''s top scorer and still finds her own shot in transition.', 3),
  ('divas', 2, 'G. Bolortuya', 'Point Guard', 'PG', 168, 58, 20, 'Ulaanbaatar', 9.8, 2.6, 5.3, 42, 'The backup point guard and youngest player on the roster, already trusted to close out tight fourth quarters.', 4),
  ('divas', 3, 'Ts. Narantuya', 'Shooting Guard', 'SG', 174, 63, 24, 'Darkhan', 15.7, 3.8, 2.4, 45, 'A sharpshooter off screens who stretches the floor and punishes defenses that help off her.', 5),
  ('divas', 6, 'O. Khulan', 'Small Forward', 'SF', 177, 67, 23, 'Erdenet', 12.3, 5.9, 2, 43, 'A versatile wing who guards three positions and finishes in transition as well as anyone on the roster.', 6),
  ('divas', 9, 'B. Gerelmaa', 'Small Forward', 'SF', 176, 65, 25, 'Ulaanbaatar', 10.6, 6.4, 1.8, 41, 'A high-motor wing who crashes the offensive glass and never backs down from a physical matchup.', 7),
  ('divas', 13, 'D. Ariungerel', 'Power Forward', 'PF', 182, 72, 27, 'Choibalsan', 11.1, 8.7, 1.2, 48, 'A veteran stretch-four whose mid-range touch keeps opposing bigs honest away from the rim.', 8),
  ('divas', 14, 'N. Tsetsegmaa', 'Power Forward', 'PF', 180, 70, 22, 'Mörön', 8.4, 7.2, 1, 46, 'An energetic young forward whose rebounding instincts have made her a rotation fixture as a sophomore.', 9),
  ('divas', 20, 'S. Khongorzul', 'Center', 'C', 186, 79, 28, 'Ulaanbaatar', 9.9, 10.3, 0.9, 54, 'The backup center and the Divas'' most efficient finisher, scoring almost exclusively around the rim.', 10),
  ('divas', 22, 'E. Nomin', 'Center', 'C', 184, 77, 24, 'Khovd', 7.6, 9.1, 0.7, 50, 'A mobile big who covers ground in pick-and-roll coverage and cleans up misses on both ends.', 11),
  ('divas', 25, 'G. Saranchimeg', 'Shooting Guard', 'SG', 172, 61, 21, 'Ulaanbaatar', 13.2, 3, 2.7, 44, 'A combo guard who can create her own shot or play off the ball, giving the bench unit instant scoring.', 12),
  ('divas', 32, 'B. Odgerel', 'Point Guard', 'PG', 169, 59, 26, 'Darkhan', 8.7, 2.3, 6.1, 40, 'A pass-first veteran guard who sets the tempo and keeps the Divas'' offense organized late in games.', 13)
on conflict do nothing;

insert into public.coaches (team, name, role, initials, bio, sort_order) values
  ('warriors', 'Coach B. Ganbaatar', 'Head Coach', 'BG', 'Now in his fourth season in Ulaanbaatar, Ganbaatar has built the league''s top-rated defense and signed a contract extension through 2028.', 0),
  ('warriors', 'Coach T. Erkhembayar', 'Assistant Coach', 'TE', 'Runs the Warriors'' scouting and game-planning, breaking down opponents to keep the league''s top-rated defense a step ahead every matchup.', 1),
  ('divas', 'Coach E. Tungalag', 'Head Coach', 'ET', 'Hired to lead the Divas'' inaugural season, Tungalag built the program''s identity around ball movement and relentless perimeter defense.', 0),
  ('divas', 'Coach S. Bolormaa', 'Assistant Coach', 'SB', 'Oversees player development for the Divas'' young core, sharpening shooting mechanics and conditioning through every practice block.', 1)
on conflict do nothing;

insert into public.news (featured, tag, date, title, excerpt, body, img) values
  (false, 'Season', '2026-09-12', 'Human Warriors Unveil 2026–27 Roster Ahead of MDL Opener', 'Nine players, one identity: the club''s deepest defensive roster yet heads into the M Development League season opener on September 20.', 'The Human Warriors front office officially unveiled its 2026–27 roster today, headlined by a deep, defense-first rotation built to defend the club''s M Development League title. Head Coach B. Ganbaatar said the group has spent the preseason installing a switch-everything scheme anchored by O. Chinguun in the paint. The Warriors open the season on September 20 in Ulaanbaatar.', '/banner.jpg'),
  (false, 'Front Office', '2026-09-05', 'Head Coach Ganbaatar Extends Contract Through 2028', 'The architect of the league''s top-rated defense commits to three more seasons in Ulaanbaatar.', 'Human Warriors ownership announced a contract extension for Head Coach B. Ganbaatar through the 2028 season. Now entering his fourth year in Ulaanbaatar, Ganbaatar has built the league''s top-rated defense and is widely credited with the club''s identity shift toward physical, switch-heavy basketball.', null),
  (false, 'Players', '2026-08-29', 'Rookie Watch: Three Warriors to Follow This Season', 'Chinguun leads a young core looking to build on last year''s All-Development recognition.', 'Three names to know heading into the season: center O. Chinguun, guard G. Khüslen, and point guard N. Batbayar. All three are expected to see rotation minutes immediately, with Chinguun in particular drawing praise from coaches for his rim protection and rebounding instincts.', null),
  (false, 'Community', '2026-08-20', 'Warriors Launch Youth Basketball Partnership in Bayanzürkh', 'A new weekend clinic program brings players onto the court with 200 local kids this fall.', 'The Human Warriors announced a new youth basketball partnership in the Bayanzürkh district, bringing first-team players onto the court with roughly 200 local children every weekend this fall. The program focuses on fundamentals, teamwork, and access to coaching for kids who might not otherwise have it.', null),
  (true, 'Season', '2026-09-14', 'Human Divas Announce Inaugural Roster for 2026–27 Season', 'Four players, one new chapter: the club''s first-ever roster heads into the season opener on September 27.', 'Human Divas officially announced its inaugural roster today, marking the club''s first season of competition. Head Coach E. Tungalag has built the program''s identity around ball movement and relentless perimeter defense, with center T. Munkhzul named as the franchise''s first-ever team captain. The Divas open their first season on September 27.', '/divaslogo.jpg'),
  (false, 'Front Office', '2026-09-08', 'Human Divas Name Munkhzul Inaugural Team Captain', 'The veteran center becomes the first captain in franchise history, leading a young core into its debut season.', 'T. Munkhzul has been named the first team captain in Human Divas history. The veteran center, who anchors the paint on both ends, will lead a young core into the franchise''s debut season under first-year Head Coach E. Tungalag.', null),
  (false, 'Players', '2026-09-01', 'Rookie Watch: Erdenetsetseg Eyes Rookie of the Year', 'The 21-year-old point guard impressed scouts throughout preseason with elite court vision and poise.', 'Point guard O. Erdenetsetseg has emerged as an early Rookie of the Year candidate after an impressive preseason. Scouts have praised her court vision and poise, noting she already leads the league in assists per 36 minutes among rookies.', null),
  (false, 'Community', '2026-08-24', 'Divas Launch Girls'' Basketball Clinics Across Ulaanbaatar', 'A new weekend program brings young girls onto the court with the full roster this fall.', 'Human Divas launched a new weekend clinic series for girls across Ulaanbaatar this fall, giving young players a chance to train alongside the full Divas roster. The club says the program will run throughout the season as part of its broader youth development mission.', '/divaslogo.jpg')
on conflict do nothing;

-- ---------------------------------------------------------------------
-- Storage — image uploads from the admin panel (news photos today;
-- the same bucket can hold player/coach photos later under their own
-- path prefix). Public read so the marketing site can show images
-- straight from Supabase's CDN; only signed-in admins can upload,
-- replace, or delete.
-- ---------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;

drop policy if exists "Public can read site images" on storage.objects;
create policy "Public can read site images" on storage.objects
  for select using (bucket_id = 'site-images');

drop policy if exists "Authenticated can manage site images" on storage.objects;
create policy "Authenticated can manage site images" on storage.objects
  for all using (bucket_id = 'site-images' and auth.role() = 'authenticated')
  with check (bucket_id = 'site-images' and auth.role() = 'authenticated');
