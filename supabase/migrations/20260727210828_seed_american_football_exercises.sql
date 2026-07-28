-- Coach Zone — seed American football exercises
-- Run after 20260727210405_exercise_scope_positions_and_sport_fix.sql.
-- Reconstructed from supabase_migrations.schema_migrations (version
-- 20260727210828); applied directly to the database and not previously
-- captured as a file in this repo's migration history.
--
-- Edited after the fact - deliberate drift-on-drift, not a mistake: the
-- reconstructed version hardcoded category_id as literal integers, the
-- same class of bug as the hardcoded sport_id that once mis-tagged soccer
-- drills as American football (see 20260716100000_backfill_af_exercises).
-- Those literals matched production because categories already existed
-- there, but categories only exist via supabase/seed.sql, which runs
-- *after* all migrations - so on a fresh `supabase db reset` this insert
-- hit a foreign key violation. Fixed by resolving category_id through a
-- slug join (like sport_id already does via `af`), so an empty or
-- non-matching categories/sports table just yields zero rows instead of
-- an error. supabase/seed.sql is now the full snapshot of this data, so
-- this migration inserting nothing here is fine either way. This file no
-- longer byte-matches what actually ran on production - the recorded
-- migration version is unchanged, and on any database where this already
-- applied the guards below make it a no-op regardless.

with af as (select id from sports where slug = 'american_football'),
data(title, description, steps, category_slug, difficulty, duration_min, equipment, pos) as (values
('Pass protection', 'Podstawowe ćwiczenie pass pro w parach. OL uczy się cierpliwości — czeka na dobry moment, zamiast rzucać się do przodu.', array['OL startuje w pozycji, partner jako "DL" nabiega na niego','"DL" ścina na wewnętrzne lub zewnętrzne ramię','OL wyczekuje momentu, atakuje rękoma i łapie za pady','Obniża biodra i zatrzymuje "DL" w miejscu','Cały czas pracuje na nogach'], 'technical', 2, 10, array[]::text[], array['OL']),
('Hands replace', 'Szybkość powrotu rąk na pady. Praca nad tym, żeby zbity blok nie oznaczał końca akcji.', array['W parach, OL stoi nisko na nogach','OL kładzie ręce na klatce partnera','Partner zbija mu ręce — pojedynczo lub obie naraz','OL jak najszybciej wraca dłonią na pady'], 'technical', 2, 8, array[]::text[], array['OL']),
('Push/pull', 'Utrzymanie zrównoważonej pozycji przy zmiennym nacisku. Uczy nie przenosić ciężaru za bardzo do przodu.', array['OL zaczyna w kontakcie z partnerem trzymającym tarczę, w pozycji do pass pro','Partner na zmianę pcha i ciągnie tarczę','OL utrzymuje blok i prawidłową, zrównoważoną pozycję'], 'technical', 2, 8, array['tarcza'], array['OL']),
('Inside zone block', 'Standardowy blok inside zone w parach. Nacisk na mocne uderzenie i pracę nóg w kontakcie.', array['W parach, partner wchodzi w dziurę po playside','OL wykonuje blok do inside','Skupienie na mocnym uderzeniu i pracy nóg w kontakcie','Wywieźć przeciwnika, a nie stać z nim w miejscu'], 'technical', 2, 10, array[]::text[], array['OL']),
('Reach block', 'Standardowy reach block przy biegach outside, w parach.', array['W parach, OL startuje w pozycji','Partner stara się utrzymać contain po playside','OL wykonuje reach block'], 'technical', 2, 10, array[]::text[], array['OL']),
('Kwadrat', 'Praca nóg OL po obwodzie kwadratu — powolna, kontrolowana, nisko na nogach.', array['Ustawiamy kwadrat 5y x 5y','OL startuje z pozycji, powoli i nisko na nogach','Do przodu -> sidestep -> backpedal -> sidestep'], 'warmup', 1, 8, array['pachołki'], array['OL']),
('Inside run gauntlet', 'Blok na dwa poziomy — wypchnięcie DL, puszczenie i wyjście do LB.', array['OL zaczyna w pozycji','Jeden partner na jego ramieniu jako "DL", drugi z tyłu jako "LB"','Na sygnał OL rusza i wypycha "DL" 3-4y','Puszcza go, wybiega do "LB" i również wypycha go 3-4y'], 'technical', 3, 10, array[]::text[], array['OL']),
('Hips roll', 'Praca bioder w kontakcie — wyciągnięcie przeciwnika w górę zamiast pchania na wprost.', array['W parach, DL łapie partnera "OL" za pady','Staje nisko, wychylony do przodu','Na sygnał pcha partnera','Równocześnie wyciąga go w górę, przybliżając do niego biodra'], 'technical', 2, 8, array[]::text[], array['DL','DE']),
('Hands fight', 'Walka rąk zakończona przejściem za plecy blokującego.', array['W parach, partner "OL" stara się położyć ręce na klatce DL','DL zbija je, "OL" szybko wraca rękoma na klatkę','Po ok. 5s zbijania rąk DL uzupełnia ruch o przejście za plecy "OL"'], 'technical', 3, 8, array[]::text[], array['DL','DE']),
('Forklift', 'Wypchnięcie rąk blokującego w górę i wejście za jego plecy.', array['W parach, partner "OL" kładzie wyciągnięte ręce na klatce DL','Na sygnał zaczyna go lekko pchać','DL łapie obiema rękoma przedramiona "OL" i wypycha jego ręce w górę','Następnie wchodzi za jego plecy'], 'technical', 3, 8, array[]::text[], array['DL','DE']),
('Bull rush', 'Rush siłowy — przepchnięcie blokującego i zrzucenie bloku w gap.', array['DL startuje z pozycji naprzeciw partnera "OL"','Na ruch "OL" (kick step) rusza','Wchodzi z nim w kontakt obiema rękoma','Przepycha go 3y do tyłu i zrzuca blok, wskakując w gap biodrami','Kończy sprintem 5y za partnera'], 'technical', 3, 10, array[]::text[], array['DL','DE']),
('Start + rip', 'Zbicie rąk blokującego i technika rip.', array['DL startuje z pozycji naprzeciw partnera "OL"','Na ruch "OL" (wyjście w stronę DL i wyciągnięcie rąk) rusza','Zbija ręce "OL" na bok swoją zewnętrzną ręką','Wewnętrzną wykonuje "rip" — ugiętą ręką schodzi nisko, po czym wyrzuca ją do góry'], 'technical', 3, 10, array[]::text[], array['DL','DE']),
('Shield blunt & rip', 'Uderzenie w tarczę zewnętrzną ręką plus rip wewnętrzną.', array['DL startuje z pozycji na ramieniu partnera "OL" trzymającego tarczę','Na ruch partnera DL startuje','Zewnętrzną ręką mocno uderza tarczę','Wewnętrzną robi technikę "rip" — nisko i do góry, zrywając blok','Wbiega sprintem za "OL"'], 'technical', 3, 10, array['tarcza'], array['DL','DE']),
('Start + axe', 'Zbicie tarczy od góry i wbiegnięcie za plecy blokującego.', array['DL startuje w pozycji','Na miejscu OL staje partner trzymający tarczę za koniec','DL rusza na ruch partnera','Bliższą ręką od góry zbija tarczę','Wbiega za plecy partnera, podnosząc w biegu znacznik z ziemi'], 'technical', 3, 10, array['tarcza','pachołki'], array['DL','DE']),
('Stab + slam/over', 'Read reakcji OL — slam gdy kontruje, over gdy się otwiera.', array['DL zaczyna w 2 point stance, na wewnętrznym partnera','Kładzie bliższą rękę na bliższej stronie klatki partnera','Na sygnał zaczyna pchać, zachowując biodra równolegle do LOS','SLAM — jeśli OL mocno kontruje: ciągniemy go do siebie i uderzamy dalszą ręką w tył barku','OVER — jeśli OL otwiera się w stronę pchania: puszczamy rękę, dalszą zbijamy jego ręce od góry ("axe") i robimy krok w poprzek OL'], 'technical', 4, 10, array[]::text[], array['DL','DE']),
('Ball drills', 'Zestaw ćwiczeń czucia piłki dla WR — do rozgrzewki lub jako uzupełnienie.', array['Podrzucanie i łapanie piłki jedną ręką trzymając ją od góry','Naprzemienne łapanie piłki za koniec','Przekładanie piłki dookoła ciała','Przekładanie piłki dookoła nogi','Przekładanie piłki pomiędzy nogami','Upuszczanie piłki z wierzchu dłoni i łapanie za koniec'], 'warmup', 1, 8, array['piłka'], array['WR']),
('Routes on air', 'Standardowe ścieżki "na sucho", bez DB. Praca nad czystością techniki.', array['WR ustawia się w pozycji','Biega standardowe ścieżki bez krycia','Skupienie na starcie, sprzedaniu ścieżki i dynamicznym ścięciu'], 'technical', 1, 10, array['piłka'], array['WR']),
('Hitch / comeback', 'Dwie ścieżki na krótkim dystansie — nacisk na sprzedanie dalekiej ścieżki.', array['Biegamy standardowy hitch (5y) i comeback (7y)','Mocny start','Sprzedanie dalekiej ścieżki','Dynamiczne ścięcie'], 'technical', 2, 10, array['piłka'], array['WR']),
('Tennis ball shuffle', 'Praca nóg plus łapanie małego obiektu — koordynacja i skupienie wzroku.', array['WR staje pomiędzy dwoma znacznikami','Partner lub coach staje naprzeciwko i rzuca piłki tenisowe raz w jedną, raz w drugą stronę','WR porusza się pomiędzy znacznikami, łapie piłki i odrzuca je'], 'technical', 2, 8, array['piłki tenisowe','pachołki'], array['WR']),
('Routes + shield hit', 'Krótkie ścieżki zakończone kontaktem — łapanie pod presją uderzenia.', array['Biegamy krótkie ścieżki: slant, hitch, 5 out, 5 in','Po złapaniu piłki WR uderzany jest tarczą','Nacisk na utrzymanie piłki po kontakcie'], 'technical', 3, 10, array['piłka','tarcza'], array['WR']),
('1 on 1 covered catch', 'WR i DB pracują razem: WR łapie pod kryciem, DB uczy się zbijać bez obracania się do piłki. W planach treningowych występuje też pod nazwą "fade adjustment".', array['WR ustawia się w pozycji, zaraz za nim staje DB','5-10y za nimi staje QB','Na sygnał WR i DB ruszają przed siebie','QB rzuca piłkę — może lekko na lewo lub prawo, żeby WR musiał się dostosować','DB obserwuje WR i stara się włożyć rękę między jego dłonie','DB nie może obracać się do piłki — czyta jej lot z ruchu WR'], 'technical', 4, 10, array['piłka'], array['WR','DB']),
('Handoffs', 'Podstawa wymiany piłki QB-RB, z zaznaczonym punktem celowania.', array['RB pracuje z QB','Handoff do inside i outside','QB co jakiś czas wyciąga piłkę (mesh read)','Ustawić ze znaczników miejsce, w które celuje RB — wewnętrzne biodro guarda lub na zewnątrz TE'], 'technical', 2, 10, array['piłka','pachołki'], array['RB','QB']),
('Pass protection (RB)', 'RB wychodzi do bloku na nadbiegającego DL.', array['RB ustawia się koło QB rzucającego ścieżki receiverom','Partner "DL" ustawia się naprzeciwko','Na sygnał QB, RB wychodzi przed niego do pass pro','Blokuje nadbiegającego DL'], 'technical', 3, 10, array[]::text[], array['RB']),
('Press cover', 'Krycie w pressie — od uderzenia obiema rękoma do off hand jam.', array['DB ustawia się w pressie naprzeciwko partnera robiącego za WR','WR robi pojedynczy lub podwójny release','DB kryje press — pierwsze uderzenie obiema rękoma','Następnie przechodzi do uderzeń jedną ręką (off hand jam — uderzamy zewnętrzną ręką)','Gdy WR mija DB, ten otwiera biodra i biegnie z nim, trzymając na nim rękę'], 'technical', 4, 10, array[]::text[], array['DB']),
('Fly man cover', 'Krycie man z off — read step i otwarcie bioder.', array['DB ustawia się w off man','"WR" startuje biegnąc fade lub seam — release w prawo lub w lewo, potem prosto po wybranej stronie DB','DB rusza backpedalem, robiąc read step w stronę release','Gdy "WR" zaczyna go mijać, otwiera biodra w jego stronę i biegnie z nim'], 'technical', 3, 10, array[]::text[], array['DB']),
('Ball strip', 'Dwóch obrońców: pierwszy zatrzymuje, drugi wyszarpuje piłkę.', array['Ustawiamy dwa rzędy, naprzeciwko nich staje "RB" z piłką','Na sygnał "RB" rusza truchtem w stronę jednego z rzędów','Defensorzy biegną do niego','Pierwszy schodzi nisko do tackla i obejmuje "RB" — bez tackla do ziemi','Drugi dobiega i wyszarpuje piłkę'], 'technical', 3, 10, array['piłka'], array['DL','LB','DB']),
('Goalline tackle', 'Tackle na krótkim dystansie z wyborem strony. Nacisk na niski kontakt.', array['Zawodnik O# ustawia się nad leżącą piłką','Zawodnik D# staje 2y od niego, pomiędzy dwoma znacznikami','Na sygnał O# podnosi piłkę i kieruje się na jeden ze znaczników','D# tackluje go','Pracować nad niskim tacklem — celujemy w biodro, a nie w barki'], 'technical', 4, 10, array['piłka','pachołki'], array['TEAM']),
('Wyścigi', 'Rozgrzewkowa rywalizacja z transportem piłki — cztery warianty podania.', array['Dzielimy się na 2 rzędy, każdy rozstawia się wzdłuż boiska co 10y','Cel: przetransportować piłkę w jedną i w drugą stronę','Gdy piłka wróci do pierwszego zawodnika, cały rząd musi dobiec do niego i go dotknąć','Warianty transportu: zwykły rzut / rzut słabszą ręką / toss bokiem / long snap','Przegrana drużyna robi 10 pompek'], 'warmup', 1, 15, array['piłka'], array['TEAM']),
('Scrimmage', 'Gra kontrolna offense vs defense na koniec treningu.', array['Ustawiamy pełne jednostki offense i defense','Gramy akcje w warunkach zbliżonych do meczowych','Coach ustala zakres — biegi, podania lub pełny playbook'], 'ssg', 3, 30, array['piłka'], array['TEAM']),
('Run drill', 'Scrimmage ograniczony do biegów, bez tacklowania.', array['Scrimmage offense vs defense — gramy tylko biegi','Jeśli brakuje zawodników, ustawiać bez WR i DB','Bez tacklowania'], 'ssg', 2, 10, array['piłka'], array['TEAM']),
('Defensive walkthrough', 'Wolne powtórzenie odczytów defensywy przeciwko formacji z dwoma TE.', array['Offense ustawia formację z dwoma TE (jeśli brakuje zawodników — bez WR)','Gramy biegi z pullem guarda lub rzut (TE wybiegają ścieżki)','Defense ustawia linię (DT i DE) oraz Mike i Backera','M i B czytają TE i ewentualny pull guarda','Reagują na otwierający się B-gap'], 'positional', 3, 10, array['piłka'], array['TEAM'])
)
insert into exercises (author_id, sport_id, category_id, title, description, steps, difficulty, duration_min, equipment, is_public, scope)
select null, af.id, cat.id, d.title, d.description, d.steps, d.difficulty, d.duration_min, d.equipment, true, 'official'
from data d
cross join af
join categories cat on cat.slug = d.category_slug
where not exists (select 1 from exercises e where e.title = d.title and e.author_id is null);

with af as (select id from sports where slug = 'american_football'),
data(title, pos) as (values
('Pass protection', array['OL']), ('Hands replace', array['OL']), ('Push/pull', array['OL']),
('Inside zone block', array['OL']), ('Reach block', array['OL']), ('Kwadrat', array['OL']),
('Inside run gauntlet', array['OL']),
('Hips roll', array['DL','DE']), ('Hands fight', array['DL','DE']), ('Forklift', array['DL','DE']),
('Bull rush', array['DL','DE']), ('Start + rip', array['DL','DE']), ('Shield blunt & rip', array['DL','DE']),
('Start + axe', array['DL','DE']), ('Stab + slam/over', array['DL','DE']),
('Ball drills', array['WR']), ('Routes on air', array['WR']), ('Hitch / comeback', array['WR']),
('Tennis ball shuffle', array['WR']), ('Routes + shield hit', array['WR']),
('1 on 1 covered catch', array['WR','DB']),
('Handoffs', array['RB','QB']), ('Pass protection (RB)', array['RB']),
('Press cover', array['DB']), ('Fly man cover', array['DB']),
('Ball strip', array['DL','LB','DB']),
('Goalline tackle', array['TEAM']), ('Wyścigi', array['TEAM']), ('Scrimmage', array['TEAM']),
('Run drill', array['TEAM']), ('Defensive walkthrough', array['TEAM'])
)
insert into exercise_positions (exercise_id, position_id)
select e.id, p.id
from data d
join exercises e on e.title = d.title and e.author_id is null
cross join af
join positions p on p.sport_id = af.id and p.code = any(d.pos)
on conflict do nothing;
