from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:testtest123@localhost:23306/sultstua"
db = SQLAlchemy(app)
CORS(app)

from autogen_sqla import *;




@app.route("/")
def main():
    return "Hello World!"


@app.route('/createTournament', methods=['POST'])
def createTournament():
    tournamentData = request.get_json(force=True)
    print(tournamentData)

    tournament = Tournament(name="Name")
    db.session.add(tournament);
    db.session.flush()

    print("tournament")
    print(tournament.id)

    idList = list();
    for anime in tournamentData["list"]:
        first = db.session.query(Anime).filter_by(anilist_id=anime["id"]).first() 
        if first is not None:
            idList.append(first.id)
            continue

        title = ""
        if "english" in anime["title"]:
            title = anime["title"]["english"]
        elif "romaji" in anime["title"]:
            title = anime["title"]["romaji"]
        
        animeRow = Anime(
            anilist_id=anime["id"],
            name="Name",
            data=anime
        )
        db.session.add(animeRow)
        db.session.flush()
        idList.append(animeRow.id)
    

    for anime_id in idList:
        db.session.add(TournamentAnime(
            tournament_id=tournament.id,
            anime_id=anime_id,
        ))

    
    db.session.commit()

    return "Added! (psych)"


if __name__ == "__main__":
    app.run()





@app.route('/testQualifier')
def displayQualifier():
    list = []
    for blob in db.session.query(Anime):
        list.append(blob.data)
    
    return jsonify(list)