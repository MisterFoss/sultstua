
# Roadmap

1. Preliminaries
1.1 Static HTML look

    Bokser, som anichart:
        Boks delt i tre
        Venstreside er bilde
        Høyreside er tittel, beskrivelse, video
        Bunnlinje er sjanger
        Poengsummer legges i høyresiden.
    
    Grid av bokser, som anichart
        Større bokser, 2 i bredden
        Venstresiden gitt størrelse, høyre dynamisk

    Boks, venstreside
        Fast størrelse
        Delt i to, øvre og nedre del
        Bilde, full størrelse

    Boks, høyreside
        Tittel
        Beskrivelse, og poengsummer
        lenke til preview i youtube
    
    Boks, bunnlinje
        Sjanger


1.2 Dynamically create HTML with JS

2. Tournament
1.1 Static HTML look
1.2 Dynamically create HTML with JS

3. Splash-side, osv.
    Collasj av thumbnails,
    2020 Q4 som titte
    Trykk for å komme inn til aktiv del (prelim, turn)


4. Judge and contestant registration

5. Score-giving and progression

<-- Goal for week 1

6. MVP: Minimum Viable Product

<-- Extended goal for week 1

    HTML/CSS
    JS
    SERVER (PHP)
    DATABASE (MySQL)
7. Refactor
    Domene-navn: sultstua.siverv.no
    SERVER -> Nginx, docker-compose
    HTML/CSS/JS -> React
    SERVER -> -PHP- Express.js (js), django (py), ...

8. Responsivity












### SQL


[x] Velg alle animene som hører til en gitt turnering med id X

```
select anime.*
    from tournament_anime
    join anime on anime_id = anime.id
	where tournament_id = 8;
```

[x] Skap en tabell for dommere. Med id (primary key, int, auto increment), navn (text)
create table dommer(
	id int primary key not null auto_increment,
    name varchar(255));


[x] Legge inn noen dommere manuelt
insert into dommer(name)
	value('bruker1');


[z] Forandre på turnering-tabellen til å inkludere en "skapt dato"-kolonne. 
alter table tournament
	add datoSkapt date default(curdate());



[x] Create a prelimary score table `tournament_prelims`
    id (int, primary key),
    dommer_id (int, foreign key),
    tournament_anime_id (int, foreign key),
    score (int),
    review (text, null)
    UNIQUE (dommer_id, tournament_anime_id)

create table tournament_prelim(
	id int AUTO_INCREMENT primary key,
	dommer_id int, 
    tournament_anime_id int,
    score int, 
    review int null,
    foreign key (dommer_id) 
		references dommer(id),
    foreign key (tournament_anime_id) 
		references tournament_anime(id),
    constraint no_multiscoring unique(dommer_id, tournament_anime_id) );
    


[x] Given a user_id, tournament_id, and anilist_id, insert a score into the tou_prelims table.

INSERT INTO tournament_prelim
    (dommer_id, tournament_anime_id, score)
SELECT 1 as dommer_id, ta.id as tournament_anime_id, 123 as score
    FROM tournament_anime as ta
    WHERE anime_id = 34 and tournament_id = 8;


[x] Update a tournament, and change its name.
UPDATE tournament
    SET name='the first'
    WHERE id = 8;

[] Update a score for a particular user/tournamnet/anime combo


anime_id
tournament_id
dommer_id
new_score











Frontend-backend-needs:


- [x] create tournament (createQualifier)
- [ ] list tournaments (listTournaments)
    - [x] api: endpoint to get all tournament names with id
    - [x] web: page that loads tournaments, and displays them
    - [ ] api: endpoint to get tournament image as image.
- [x] show one tournament, with animes (list tournament links, including judge creation, etc.)
- [ ] edit a tournament name
- [x] create new judge
- [x] list judges
- [ ] edit a judge
- [ ] remove a judge
- [/] make a preliminaries page listing judges and scoring
- [/] let a judge score in preliminaries, and edit their score. (including a review!)
- [ ] show the 16 contestants after the preliminaries
- [ ] Phase 2: Brackets and stages.
- [ ] Stretchgoal: Collage of anime pictures as a tournament picture.
- [ ] Stretchgoal: IMPORT/EXPORT TO GOOGLE SHEETS IN A BEAUTIFUL MANNER!




id PK, tournament id FK, anilist_id foringn FK, bracket_stage, bracket possition

 
+-------+-------+                        +----------------------------------+                         +-------+-------+ 
|       |       |                        +          TOURNAMENT NAME         +                         |       |       | 
|  IMG  |  IMG  |                        +----------------++----------------+                         |  IMG  |  IMG  | 
|       |       |  +-------+-------+     |                ||                |     +-------+-------+   |       |       | 
+-------+-------+  |       |       |     |      IMG       ||       IMG      |     |       |       |   +-------+-------+ 
|   T   |   A   |  |  IMG  |  IMG  |     |                ||                |     |  IMG  |  IMG  |   |   T   |   A   | 
+-------+-------+  |       |       |     +----------------++----------------+     |       |       |   +-------+-------+ 
+-------+-------+  +-------+-------+     |       T        ||        A       |     +-------+-------+   +-------+-------+ 
|       |       |  |   T   |   A   |     +----------------++----------------+     |   T   |   A   |   |       |       | 
|  IMG  |  IMG  |  +-------+-------+                                              +-------+-------+   |  IMG  |  IMG  | 
|       |       |                       +-------+-------+    +-------+-------+                        |       |       | 
+-------+-------+                       |       |       |    |       |       |                        +-------+-------+ 
|   T   |   A   |                       |  IMG  |  IMG  |    |  IMG  |  IMG  |                        |   T   |   A   | 
+-------+-------+                       |       |       |    |       |       |                        +-------+-------+ 
+-------+-------+                       +-------+-------+    +-------+-------+                        +-------+-------+ 
|       |       |                       |   T   |   A   |    |   T   |   A   |                        |       |       | 
|  IMG  |  IMG  |                       +-------+-------+    +-------+-------+                        |  IMG  |  IMG  | 
|       |       |  +-------+-------+                                              +-------+-------+   |       |       | 
+-------+-------+  |       |       |                                              |       |       |   +-------+-------+ 
|   T   |   A   |  |  IMG  |  IMG  |     +----------------++----------------+     |  IMG  |  IMG  |   |   T   |   A   | 
+-------+-------+  |       |       |     |                ||                |     |       |       |   +-------+-------+ 
+-------+-------+  +-------+-------+     |      IMG       ||       IMG      |     +-------+-------+   +-------+-------+ 
|       |       |  |   T   |   A   |     |                ||                |     |   T   |   A   |   |       |       | 
|  IMG  |  IMG  |  +-------+-------+     +----------------++----------------|     +-------+-------+   |  IMG  |  IMG  | 
|       |       |                        |       T        ||        A       |                         |       |       | 
+-------+-------+                        +----------------++----------------+                         +-------+-------+ 
|   T   |   A   |                        +----------------++---------------++                         |   T   |   A   | 
+-------+-------+                        +----------------++---------------++                         +-------+-------+ 
                                         +----------------++---------------++































+-------+-------+
|       |       |
|  IMG  |  IMG  |
|       |       |
+-------+-------+
|   T   |   A   |
+-------+-------+
+-------+-------+
+-------+-------+
+-------+-------+   +-------+-------+
+-------+-------+   |       |       |
+-------+-------+   |  IMG  |  IMG  |
                    |       |       |
+-------+-------+   +-------+-------+
|       |       |   |   T   |   A   |
|  IMG  |  IMG  |   +-------+-------+
|       |       |   +-------+-------+
+-------+-------+   +-------+-------+
|   T   |   A   |   +-------+-------+
+-------+-------+   +-------+-------+
+-------+-------+   +-------+-------+
+-------+-------+
+-------+-------+
+-------+-------+                       +-------+-------+
+-------+-------+                       |       |       |
                                        |  IMG  |  IMG  |
                                        |       |       |
+-------+-------+                       +-------+-------+
|       |       |                       |   T   |   A   |
|  IMG  |  IMG  |                       +-------+-------+
|       |       |                       +-------+-------+
+-------+-------+                       +-------+-------+
|   T   |   A   |                       +-------+-------+
+-------+-------+                       +-------+-------+
+-------+-------+                       +-------+-------+
+-------+-------+
+-------+-------+   +-------+-------+
+-------+-------+   |       |       |
+-------+-------+   |  IMG  |  IMG  |
                    |       |       |
+-------+-------+   +-------+-------+
|       |       |   |   T   |   A   |
|  IMG  |  IMG  |   +-------+-------+
|       |       |   +-------+-------+
+-------+-------+   +-------+-------+
|   T   |   A   |   +-------+-------+
+-------+-------+   +-------+-------+
+-------+-------+   +-------+-------+
+-------+-------+
+-------+-------+
+-------+-------+   
+-------+-------+   



+-------+-------+
|       |       |
|  IMG  |  IMG  |
|       |       |
+-------+-------+
|   T   |   A   |
+-------+-------+
+-------+-------+
+-------+-------+
+-------+-------+   +-------+-------+
+-------+-------+   |       |       |
+-------+-------+   |  IMG  |  IMG  |
                    |       |       |
+-------+-------+   +-------+-------+
|       |       |   |   T   |   A   |
|  IMG  |  IMG  |   +-------+-------+
|       |       |   +-------+-------+
+-------+-------+   +-------+-------+
|   T   |   A   |   +-------+-------+
+-------+-------+   +-------+-------+
+-------+-------+   +-------+-------+
+-------+-------+
+-------+-------+
+-------+-------+                       +-------+-------+
+-------+-------+                       |       |       |
                                        |  IMG  |  IMG  |
                                        |       |       |
+-------+-------+                       +-------+-------+
|       |       |                       |   T   |   A   |
|  IMG  |  IMG  |                       +-------+-------+
|       |       |                       +-------+-------+
+-------+-------+                       +-------+-------+
|   T   |   A   |                       +-------+-------+
+-------+-------+                       +-------+-------+
+-------+-------+                       +-------+-------+
+-------+-------+
+-------+-------+   +-------+-------+
+-------+-------+   |       |       |
+-------+-------+   |  IMG  |  IMG  |
                    |       |       |
+-------+-------+   +-------+-------+
|       |       |   |   T   |   A   |
|  IMG  |  IMG  |   +-------+-------+
|       |       |   +-------+-------+
+-------+-------+   +-------+-------+
|   T   |   A   |   +-------+-------+
+-------+-------+   +-------+-------+
+-------+-------+   +-------+-------+
+-------+-------+
+-------+-------+
+-------+-------+   
+-------+-------+   