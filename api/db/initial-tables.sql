create database if not exists sultstua;

use sultstua;

drop table if exists tournament_anime;
drop table if exists anime;
drop table if exists tournament;

create table `tournament` (
    id int not null primary key auto_increment,
    name text not null
);

create table `anime` (
    id int not null primary key auto_increment,
    anilist_id int not null,
    name text not null,
    data json not null,
    UNIQUE (anilist_id)
);

create table `tournament_anime` (
    id int not null primary key auto_increment,
    tournament_id int not null,
    anime_id int not null,
    FOREIGN KEY (tournament_id) REFERENCES tournament(id),
    FOREIGN KEY (anime_id) REFERENCES anime(id)
);
