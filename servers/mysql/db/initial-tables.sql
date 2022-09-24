-- Active: 1625138371254@@127.0.0.1@23306@sultstua
create database if not EXISTS sultstua;

use sultstua;

drop table if exists bracket_vote;
drop table if exists bracket;
drop table if exists bracket_state;
drop table if exists prelim_vote;
drop table if exists vote;
drop table if exists `entry`;
drop table if exists anime;
drop table if exists judge;
drop table if exists tour;
drop table if exists tour_stage;






create table `tour_stage`(
	id int primary key not null,
    name varchar(255) unique not null
);
INSERT INTO `tour_stage`
    (id, name)
VALUES
    (0, "DRAFT"),
    (1, "PRELIMINERY"),
    (2, "BRACKETS"),
    (3, "FINISHED")
;



create table `tour` (
    id int not null primary key auto_increment,
    tour_stage_id INT NOT NULL DEFAULT 1,
    name text not null,
    dateCreated date default(curdate()),
    splash MEDIUMTEXT,
    FOREIGN KEY (tour_stage_id) REFERENCES tour_stage(id)
);


create table `anime` (
    id int not null primary key auto_increment,
    anilist_id int not null,
    name text not null,
    data json not null,
    UNIQUE (anilist_id)
);


create table `entry` (
    id int not null primary key auto_increment,
    tour_id int not null,
    anime_id int not null,
    FOREIGN KEY (tour_id) REFERENCES tour(id),
    FOREIGN KEY (anime_id) REFERENCES anime(id)
);


create table `judge` (
	id int primary key not null auto_increment,
    name varchar(255)
);

INSERT INTO `judge`
    (name)
VALUES
    ("admin");
    

CREATE TABLE `vote` (
    id int primary key not null auto_increment,
    judge_id INT NOT NULL,
    score_A INT NULL,
    score_B INT NULL,
    FOREIGN KEY (judge_id) REFERENCES judge(id)
);

CREATE TABLE `bracket_state` (
	id int primary key not null,
    name varchar(255) unique not null    
);

INSERT INTO `bracket_state`
    (id, name)
VALUES
    (0, "UNFILLED"),
    (1, "ONGOING"),
    (2, "DECIDED"),
    (3, "FINISHED")
;



CREATE TABLE `bracket` (
    id int primary key not null auto_increment,
    entry_id_A INT NOT NUll,
    entry_id_B INT NOT NUll,
    position INT NOT NULL,
    round INT NOT NULL,
    bracket_state_id INT DEFAULT 0,
    FOREIGN KEY (entry_id_A) REFERENCES entry(id),
    FOREIGN KEY (entry_id_B) REFERENCES entry(id),
    FOREIGN KEY (bracket_state_id) REFERENCES bracket_state(id)
);



CREATE TABLE `prelim_vote` (
    id int primary key not null auto_increment,
    entry_id INT NOT NULL,
    vote_id INT NOT NULL,
    FOREIGN KEY (entry_id) REFERENCES entry(id),
    FOREIGN KEY (vote_id) REFERENCES vote(id)
);

CREATE TABLE `bracket_vote` (
    id int primary key not null auto_increment,
    bracket_id INT NOT NULL,
    vote_id INT NOT NULL,
    FOREIGN KEY (bracket_id) REFERENCES bracket(id),
    FOREIGN KEY (vote_id) REFERENCES vote(id)
);