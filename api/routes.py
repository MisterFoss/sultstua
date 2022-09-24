from socket import socket
from flask import Flask, request, jsonify, g
from flask_cors import CORS
import json

import db

app = Flask(__name__)
CORS(app)


@app.route('/api/createTournament', methods=['POST'])
def createTournament():
    tournamentData = request.get_json(force=True)

    tournamentId = db.createTournament(tournamentData["name"], tournamentData["splash"])

    print("Created tournament with id = %i" % (tournamentId))

    animeIds = list()
    for anime in tournamentData["list"]:
        anilistId = anime["id"]
        animeId = db.getAnimeIdByAnilistId(anilistId)
        if animeId is None:
            animeId = db.createAnime(anilistId, anime)
        animeIds.append(animeId)
    
    db.addAnimesToTournament(tournamentId, animeIds)
    return "Added!"


@app.route('/api/testQual')
def displayQualifier():
    dataList = []
    for blob in db.getAllAnime():
        dataList.append(json.loads(blob["data"]));
    
    return jsonify(dataList)


# /getTournament/8
@app.route('/api/getTournament/<int:tournamentId>')
def displayPreliminaryForTournament(tournamentId):
    tour = dict()

    dataList = []
    for anime in db.getAnimeForTournament(tournamentId): 
        dataList.append(json.loads(anime["data"]))
    tour["animes"] = dataList

    tour["tournamentName"] = db.getTournamentName(tournamentId)
    tour["score"] = db.getTournamentScore(tournamentId)
    tour["stage"] = db.getTournamentStage(tournamentId)

    return jsonify(tour)


@app.route('/api/getTourList')
def getTourList():
    return jsonify(db.getTournaments())


@app.route('/api/vote', methods=['POST'])
def scoreAnime():
    voteData = request.get_json(force=True)

    tour_id = int(voteData["tour_id"]) 
    anilist_id = int(voteData["anilist_id"])
    judge_id = int(voteData["judge_id"])
    score = int(voteData["score"])

    # judgeId = db.getJudgeIdByName(judgeName)
    # if judgeId is None:
    #     return "Judgement: Denied!", 401
    
    # animeId = db.getAnimeIdByAnilistId(anilistId)
    # if animeId is None:
    #     return "Which anime is that?", 422

    # db.writeJudgeScore(tournamentId, animeId, judgeId, score)
    db.votePrelim(anilist_id, tour_id, judge_id, score)

    # scoreList = db.getTournamentScore(tournamentId, animeId)
    print(anilist_id, tour_id, judge_id, score)
    return jsonify(anilist_id, tour_id, judge_id, score)


@app.route("/api/test")
def test():
    db.writeJudgeScore(9,62,1,12)
    return ""


@app.route("/api/getJudges")
def getJudges():
    return jsonify(db.getJudges())


@app.route("/api/createJudge", methods=["POST"])
def createJudge():
    judgeName = request.get_json(force=True)
    db.createJudge(judgeName)
    return ""
