from re import T
from flask import Flask, request, jsonify, g
from flask_cors import CORS
import pymysql.cursors
import json

from config import get_db;


def createTournament(name, splash):
    cursor = get_db().cursor()
    cursor.execute(
        """
        INSERT INTO `tour`
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
            INSERT INTO `entry`
                (tour_id, anime_id)
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
        SELECT tour_id, COUNT(*)
            FROM entry
            GROUP BY tour_id
        """
    )
    return cursor.fetchall()


def getAnimeForTournament(tournamentId):
    cursor = get_db().cursor()
    cursor.execute(
        """
        select anime.*
            from entry
            join anime on anime_id = anime.id
            where tour_id = %s
        """,
        (tournamentId,)
    )
    return cursor.fetchall()


def getTournamentName(tournamentId):
    cursor = get_db().cursor()
    cursor.execute(
        """
        SELECT name
        FROM  tour
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
        SELECT tour_stage_id
        FROM  tour
        WHERE id = %s
        """,
        (tournamentId,)
    )
    tour = cursor.fetchone()
    return tour["tour_stage_id"]



"""
needs redoing
!
!
!
!
"""

# def getJudgeScores(tournamentId):
#     cursor = get_db().cursor()
#     cursor.execute(
#         """
#         SELECT judge_id, score, anime_id
#             FROM tournament_prelim
#             JOIN tournament_anime 
#                 ON tournament_anime.id=tournament_prelim.tournament_anime_id
#             WHERE tournament_id = %s;
#         """,
#         (tournamentId,)
#     )
#     return cursor.fetchall()



def getTournamentScore(tournamentId, animeId=None):
    cursor = get_db().cursor()
    cursor.execute(
        """
        SELECT anime.anilist_id, judge.name, vote.score_A, vote.score_B
            FROM entry
            JOIN anime ON anime.id = entry.anime_id
            LEFT JOIN prelim_vote ON prelim_vote.entry_id = entry.id
            LEFT JOIN vote ON vote.id = prelim_vote.vote_id 
            LEFT JOIN judge on judge.id = vote.judge_id
            WHERE entry.tour_id=%s;
        """,
        (tournamentId)
    )
    return cursor.fetchall()


# def getTournamentScore(tournamentId, animeId=None):
#     cursor = get_db().cursor()
#     cursor.execute(
#         f"""
#         SELECT anime.anilist_id, CAST(SUM(score) as SIGNED) as score
#             FROM tournament_prelim
#             JOIN tournament_anime 
#                 ON tournament_anime.id=tournament_prelim.tournament_anime_id
#             JOIN anime ON tournament_anime.anime_id = anime.id
#             WHERE tournament_id = %s
#             {"" if animeId is None else "AND anime_id = %s"}
#             GROUP BY anime_id;
#         """,
#         (tournamentId,) if animeId is None else (tournamentId, animeId)
#     )
#     return cursor.fetchall()




def createVote(judge_id, score_A=None, score_B=None):
    cursor = get_db().cursor()
    cursor.execute(
        """
        INSERT INTO vote(judge_id, score_A, score_B)
            VALUES (%s, %s, %s)
        """,
        (judge_id, score_A, score_B)
    )
    return cursor.lastrowid


def addVoteToPrelim(vote_id, entry_id):
    cursor = get_db().cursor()
    cursor.execute(
        """
        INSERT INTO prelim_vote(vote_id, entry_id)
            VALUES (%s, %s)
        """,
        (vote_id, entry_id)
    )


def getEntryID(tour_id, anilist_id):
    cursor = get_db().cursor()
    cursor.execute(
    """
    SELECT entry.id FROM entry
    JOIN anime on anime_id = anime.id
    join tour on tour_id =tour.id
    WHERE tour_id = %s and anilist_id = %s;
    """,(tour_id, anilist_id)
    )
    return cursor.fetchone()["id"]



def votePrelim(anilist_id, tour_id, judge_id, score):
    entry_id = getEntryID(tour_id, anilist_id)
    vote_id = createVote(judge_id, score)
    addVoteToPrelim(vote_id, entry_id)



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
            FROM tour;
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
    

# def writeJudgeScore(tournamentId, animeId, judgeId, score):
#     cursor = get_db().cursor()
#     cursor.execute(
#         """
#         INSERT INTO tournament_prelim
#             (judge_id, tournament_anime_id, score)
#         SELECT * FROM (
#             SELECT %s as judge_id, tournament_anime.id as tournament_anime_id, %s as score
#                 FROM tournament_anime
#                 WHERE anime_id = %s and tournament_id = %s
#         ) as new
#         ON DUPLICATE KEY UPDATE score = new.score;
#         """,
#         (judgeId, score, animeId, tournamentId)
#     )

def getJudges():
    cursor = get_db().cursor()
    cursor.execute(
        """
        SELECT name
            FROM judge;
        """
    )
    return cursor.fetchall()



def createBracket(position, entry_id_A, entry_id_B):
    return None    
