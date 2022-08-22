from flask import Flask, request, jsonify, g
from flask_cors import CORS
import pymysql.cursors
import json

from config import get_db;


def createTournament(name, splash):
    cursor = get_db().cursor()
    cursor.execute(
        """
        INSERT INTO `tournament`
            (name, splash)
        VALUES
            (%s, %s)
        """,
        (name, splash)
    )
    return cursor.lastrowid

def getAnimeIdByAnilistId(anilistId):
    cursor = get_db().cursor()
    cursor.execute(
        """
        SELECT `id`
            FROM `anime`
            WHERE anilist_id = %s
        """,
        (anilistId,)
    )
    existing = cursor.fetchone()
    if existing is not None:
        return existing["id"]
    else:
        return None

def getAnimeTitle(animeData):
    title = animeData["title"];
    if "english" in title and title["english"] is not None:
        return title["english"]
    elif "romaji" in title and title["romaji"] is not None:
        return title["romaji"]
    else:
        return ""
    
def createAnime(anilistId, animeData):
    title = getAnimeTitle(animeData)

    cursor = get_db().cursor()
    cursor.execute(
        """
        INSERT INTO `anime`
            (anilist_id, name, data)
        VALUES
            (%s,%s,%s)
        """,
        (anilistId, title, json.dumps(animeData))
    )
    return cursor.lastrowid

def addAnimesToTournament(tournamentId, animeIds):
    cursor = get_db().cursor()
    for animeId in animeIds:
        cursor.execute(
            """
            INSERT INTO `tournament_anime`
                (tournament_id, anime_id)
            VALUES
                (%s,%s)
            """,
            (tournamentId, animeId)
        )



def getAllAnime():
    cursor = get_db().cursor()
    cursor.execute(
        """
        SELECT * FROM `anime`
        """
    )
    return cursor.fetchall()

def countTournamentAnimes():
    cursor = get_db().cursor()
    cursor.execute(
        """
        SELECT tournament_id, COUNT(*)
            FROM tournament_anime
            GROUP BY tournament_id
        """
    )
    return cursor.fetchall()


def getAnimeForTournament(tournamentId):
    cursor = get_db().cursor()
    cursor.execute(
        """
        select anime.*
            from tournament_anime
            join anime on anime_id = anime.id
            where tournament_id = %s
        """,
        (tournamentId,)
    )
    return cursor.fetchall()


def getTournamentName(tournamentId):
    cursor = get_db().cursor()
    cursor.execute(
        """
        SELECT name
        FROM  tournament
        WHERE id = %s
        """,
        (tournamentId,)
    )
    tour = cursor.fetchone()
    return None if tour is None else tour["name"]


def getTournamentStage(tournamentId):
    cursor = get_db().cursor()
    cursor.execute(
        """
        SELECT stage_id
        FROM  tournament
        WHERE id = %s
        """,
        (tournamentId,)
    )
    tour = cursor.fetchone()
    return tour["stage_id"]




def getJudgeScores(tournamentId):
    cursor = get_db().cursor()
    cursor.execute(
        """
        SELECT judge_id, score, anime_id
            FROM tournament_prelim
            JOIN tournament_anime 
                ON tournament_anime.id=tournament_prelim.tournament_anime_id
            WHERE tournament_id = %s;
        """,
        (tournamentId,)
    )
    return cursor.fetchall()



def getTournamentScore(tournamentId, animeId=None):
    cursor = get_db().cursor()
    cursor.execute(
        f"""
        SELECT anime.anilist_id, CAST(SUM(score) as SIGNED) as score
            FROM tournament_prelim
            JOIN tournament_anime 
                ON tournament_anime.id=tournament_prelim.tournament_anime_id
            JOIN anime ON tournament_anime.anime_id = anime.id
            WHERE tournament_id = %s
            {"" if animeId is None else "AND anime_id = %s"}
            GROUP BY anime_id;
        """,
        (tournamentId,) if animeId is None else (tournamentId, animeId)
    )
    return cursor.fetchall()



def createJudge(name):
    cursor = get_db().cursor()
    cursor.execute(
        """
        insert into judge(name)
            value(%s);
        """,
        (name,)
    )
    return cursor.lastrowid



def getTournaments():
    cursor = get_db().cursor()
    cursor.execute(
        """
        SELECT *
            FROM tournament;
        """
    )
    return cursor.fetchall()

def getJudgeIdByName(name):
    cursor = get_db().cursor()
    cursor.execute(
        """
            SELECT id
                FROM judge
                WHERE name = %s
        """,
        (name,)
    )
    judge = cursor.fetchone()
    return None if judge is None else judge["id"]
    

def writeJudgeScore(tournamentId, animeId, judgeId, score):
    cursor = get_db().cursor()
    cursor.execute(
        """
        INSERT INTO tournament_prelim
            (judge_id, tournament_anime_id, score)
        SELECT * FROM (
            SELECT %s as judge_id, tournament_anime.id as tournament_anime_id, %s as score
                FROM tournament_anime
                WHERE anime_id = %s and tournament_id = %s
        ) as new
        ON DUPLICATE KEY UPDATE score = new.score;
        """,
        (judgeId, score, animeId, tournamentId)
    )

def getJudges():
    cursor = get_db().cursor()
    cursor.execute(
        """
        SELECT name
            FROM judge;
        """
    )
    return cursor.fetchall()