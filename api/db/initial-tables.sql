create database if not exists sultstua;

use sultstua;

drop table if exists tournament_prelim;
drop table if exists dommer;
drop table if exists tournament_anime;
drop table if exists anime;
drop table if exists tournament;

create table `tournament` (
    id int not null primary key auto_increment,
    name text not null,
    dateCreated date default(curdate()),
    splash text
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

create table `dommer` (
	id int primary key not null auto_increment,
    name varchar(255)
);
    
create table `tournament_prelim`(
	id int AUTO_INCREMENT primary key,
	dommer_id int, 
    tournament_anime_id int,
    score int, 
    review int null,
    foreign key (dommer_id) 
		references dommer(id),
    foreign key (tournament_anime_id) 
		references tournament_anime(id),
    constraint no_multiscoring unique (dommer_id, tournament_anime_id)
);