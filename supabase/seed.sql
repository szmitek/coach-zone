-- Coach Zone — official exercise library seed
-- Run AFTER the schema migration. Official exercises have author_id = NULL.
-- Descriptions in Polish (target users are Polish football coaches);
-- category names are bilingual (name_pl / name_en).

insert into public.categories (slug, name_pl, name_en) values
  ('warmup',      'Rozgrzewka',        'Warm-up'),
  ('technical',   'Technika',          'Technical'),
  ('positional',  'Gra pozycyjna',     'Positional play'),
  ('ssg',         'Gry zadaniowe',     'Small-sided games'),
  ('strength',    'Motoryka',          'Strength & conditioning'),
  ('cooldown',    'Schłodzenie',       'Cool-down')
on conflict (slug) do nothing;

-- Helper: category id by slug is looked up inline via subselect.

insert into public.exercises
  (author_id, category_id, title, description, steps, duration_min, difficulty, equipment, is_public)
values
-- ROZGRZEWKA -----------------------------------------------------------------
(null, (select id from public.categories where slug='warmup'),
 'Rozgrzewka dynamiczna w truchcie',
 'Ogólna aktywacja przed treningiem: stopniowe podniesienie tętna i mobilizacja stawów w ruchu, bez statycznego rozciągania.',
 array['Trucht wzdłuż linii boiska (2 okrążenia)','Wymachy nóg w przód i w bok co 10 m','Skip A, skip C, wielokroki','Krążenia bioder i obręczy barkowej','Kilka przyspieszeń na 70% na dystansie 20 m'],
 12, 1, array['pachołki'], true),

(null, (select id from public.categories where slug='warmup'),
 'Rondo 4v1',
 'Klasyczne dziadki: utrzymanie piłki w kole, aktywacja techniczna i pierwszy kontakt pod presją. Świetne na rozgrzewkę z piłką.',
 array['4 zawodników na obwodzie koła (śr. 8–10 m), 1 w środku','Podania pierwszym kontaktem, maksymalnie dwa kontakty','Zawodnik ze środka odbiera lub wymusza stratę','Kto stracił lub podał źle — wchodzi do środka','Zmiana broniącego co 2 min'],
 10, 2, array['piłki','znaczniki'], true),

(null, (select id from public.categories where slug='warmup'),
 'Aktywacja z drabinką koordynacyjną',
 'Pobudzenie układu nerwowo-mięśniowego: szybka praca stóp i koordynacja przed częścią główną.',
 array['5 wzorców kroków przez drabinkę (np. jedna stopa w polu, dwie stopy, bieg bokiem)','Po wyjściu z drabinki 5 m przyspieszenia','2–3 serie na wzorzec','Powrót truchtem do kolejki'],
 8, 1, array['drabinka koordynacyjna'], true),

-- TECHNIKA -------------------------------------------------------------------
(null, (select id from public.categories where slug='technical'),
 'Podania w parach na dwa kontakty',
 'Doskonalenie jakości pierwszego kontaktu i celności podania na krótkim dystansie.',
 array['Pary naprzeciw siebie w odległości 8–12 m','Przyjęcie kierunkowe pierwszym kontaktem, podanie drugim','Po 10 podań zmiana nogi przyjmującej','Zwiększaj dystans i tempo z każdą serią'],
 12, 2, array['piłki','pachołki'], true),

(null, (select id from public.categories where slug='technical'),
 'Prowadzenie piłki w slalomie',
 'Kontrola piłki przy zmianach kierunku i praca obu nóg podczas prowadzenia.',
 array['Ustaw 6 pachołków co 1,5 m','Prowadź piłkę slalomem wewnętrzną i zewnętrzną częścią stopy','Na końcu tor wykończ podaniem do partnera','Mierz czas, ale nie kosztem kontroli'],
 10, 2, array['piłki','pachołki'], true),

(null, (select id from public.categories where slug='technical'),
 'Uderzenia na bramkę po podaniu',
 'Wykończenie akcji: przyjęcie w ruchu i celne uderzenie z pierwszej lub po jednym kontakcie.',
 array['Podający zagrywa z boku pola karnego','Strzelec nabiega, przyjmuje kierunkowo i uderza','Naprzemiennie prawa i lewa strona','Bramkarz w bramce — realna presja','Rotacja: strzelec → podający → koniec kolejki'],
 15, 3, array['piłki','bramka'], true),

-- GRA POZYCYJNA --------------------------------------------------------------
(null, (select id from public.categories where slug='positional'),
 'Gra pozycyjna 6v6+3',
 'Utrzymanie piłki z przewagą liczebną i nauka zajmowania właściwych pozycji w strefach.',
 array['Kwadrat 25x25 m podzielony na strefy','6v6, 3 zawodników neutralnych zawsze z posiadającą drużyną','Cel: 8 podań pod rząd = punkt','Neutralni maksymalnie dwa kontakty','Akcent na szerokość i głębokość ustawienia'],
 18, 3, array['piłki','znaczniki','znaczniki treningowe'], true),

(null, (select id from public.categories where slug='positional'),
 'Wyprowadzenie piłki spod pressingu 4v2',
 'Budowanie gry od tyłu: cierpliwe wyprowadzenie przez linie mimo presji dwóch napastników.',
 array['4 obrońców/pomocników w prostokącie, 2 napastników presuje','Zadanie: przeprowadzić piłkę przez linię końcową podaniem','Napastnicy po odbiorze strzelają do małej bramki','Zmiana ról co 3 min'],
 15, 3, array['piłki','małe bramki','znaczniki'], true),

(null, (select id from public.categories where slug='positional'),
 'Przejście z obrony do ataku (tranzycja)',
 'Szybkie przejście do ataku po odbiorze i natychmiastowy powrót do obrony po stracie.',
 array['Dwie drużyny 7v7 na połowie boiska','Po odbiorze drużyna ma 8 s na dojście do bramki','Po stracie natychmiastowy pressing (5 s)','Trener wrzuca nową piłkę po każdej akcji, by utrzymać tempo'],
 20, 4, array['piłki','bramki','znaczniki'], true),

-- GRY ZADANIOWE --------------------------------------------------------------
(null, (select id from public.categories where slug='ssg'),
 'Gra 4v4 na cztery bramki',
 'Mała gra rozwijająca zmianę kierunku ataku i orientację w przestrzeni.',
 array['Boisko 30x20 m, po dwie małe bramki na każdej połowie szerokości','Można zdobyć gola w dowolną z dwóch bramek przeciwnika','Zachęcaj do szybkiej zmiany strony ataku','4–6 minut na serię, przerwa na wodę'],
 16, 3, array['piłki','małe bramki','znaczniki'], true),

(null, (select id from public.categories where slug='ssg'),
 'Gra 7v7 z warunkiem dwóch kontaktów',
 'Gra właściwa z ograniczeniem liczby kontaktów — wymusza szybkie myślenie i grę bez piłki.',
 array['Boisko ok. 50x40 m, bramki z bramkarzami','Maksymalnie dwa kontakty na zawodnika','Trzeci kontakt = rzut wolny dla przeciwnika','Znieś warunek na ostatnie 5 min dla swobodnej gry'],
 20, 3, array['piłki','bramki','znaczniki'], true),

-- MOTORYKA -------------------------------------------------------------------
(null, (select id from public.categories where slug='strength'),
 'Interwały biegowe wysokiej intensywności',
 'Rozwój wytrzymałości szybkościowej: powtarzane wysiłki blisko maksymalnego tempa.',
 array['Wyznacz odcinek 40 m','15 s bieg na 90–95%, 45 s trucht/marsz powrotny','6–8 powtórzeń w serii','2 serie z 3 min przerwy między nimi','Kontroluj technikę biegu przy zmęczeniu'],
 18, 4, array['pachołki','stoper'], true),

(null, (select id from public.categories where slug='strength'),
 'Obwód siłowy z masą własnego ciała',
 'Wzmocnienie ogólne i profilaktyka urazów bez sprzętu — do wykonania na boisku.',
 array['5 stacji: przysiady, wykroki, deska, pompki, mostek biodrowy','40 s pracy / 20 s przerwy na stację','Po pełnym obwodzie 2 min przerwy','2–3 rundy zależnie od okresu przygotowań','Akcent na poprawną technikę, nie liczbę powtórzeń'],
 15, 3, array['maty (opcjonalnie)'], true),

-- SCHŁODZENIE ----------------------------------------------------------------
(null, (select id from public.categories where slug='cooldown'),
 'Trucht wytłumiający i rozciąganie statyczne',
 'Stopniowe obniżenie tętna i rozciąganie głównych grup mięśniowych po wysiłku.',
 array['5 min spokojnego truchtu, przechodzącego w marsz','Rozciąganie statyczne: łydki, uda przednie i tylne, biodra','Każda pozycja utrzymywana 20–30 s','Spokojny, głęboki oddech przez cały czas'],
 10, 1, array[]::text[], true),

(null, (select id from public.categories where slug='cooldown'),
 'Rolowanie i mobilizacja',
 'Regeneracja powięziowa i redukcja napięcia mięśniowego po intensywnym treningu.',
 array['Rolowanie: łydki, uda, pośladki, pasmo biodrowo-piszczelowe','30–45 s na każdą partię, unikaj rolowania stawów','Delikatna mobilizacja bioder i kręgosłupa piersiowego','Zakończ kilkoma spokojnymi, pełnymi oddechami'],
 10, 1, array['rollery'], true);
