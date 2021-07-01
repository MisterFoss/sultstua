from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql.cursors
import json



connection = pymysql.connect(
    host='localhost',
    port=23306,
    user='root',
    password='testtest123',
    db='sultstua',
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor
)
app = Flask(__name__)
CORS(app)


@app.route("/")
def main():
    return "Hello World!"




sql_create_tournament = """
INSERT INTO `tournament`
    (name)
VALUES
    (%s)
"""

sql_does_anime_exist = """
SELECT `id`
    FROM `anime`
    WHERE anilist_id = %s
"""

sql_create_anime = """
INSERT INTO `anime`
    (anilist_id, name, data)
VALUES
    (%s,%s,%s)
"""

sql_create_tournament_anime = """
INSERT INTO `tournament_anime`
    (tournament_id, anime_id)
VALUES
    (%s,%s)
"""

@app.route('/createTournament', methods=['POST'])
def createTournament():
    tournamentData = request.get_json(force=True)
    with connection.cursor() as cursor:
        name = tournamentData["name"];
        cursor.execute(sql_create_tournament, (name))
        tournament_id = cursor.lastrowid
        print("Created tournament with id = %i" % (tournament_id))
        idList = list();
        for anime in tournamentData["list"]:
            anilist_id = anime["id"]
            cursor.execute(sql_does_anime_exist, (anilist_id))
            existing = cursor.fetchone()
            if existing is not None:
                idList.append(existing["id"])
                continue
            title = ""
            if "english" in anime["title"] and anime["title"]["english"] is not None:
                title = anime["title"]["english"]
            elif "romaji" in anime["title"] and anime["title"]["romaji"] is not None:
                title = anime["title"]["romaji"]

            cursor.execute(sql_create_anime, (anilist_id, title, json.dumps(anime)))
            idList.append(cursor.lastrowid)
        
        for anime_id in idList:
            cursor.execute(sql_create_tournament_anime, (tournament_id, anime_id))
    connection.commit()
    connection.close()
    return "Added!"


if __name__ == "__main__":
    app.run()





sql_get_all_anime = """
    SELECT * FROM `anime`
"""
@app.route('/testQualifier')
def displayQualifier():
    dataList = []
    with connection.cursor() as cursor:
        cursor.execute(sql_get_all_anime)
        for blob in cursor.fetchall():
            dataList.append(blob["data"]);
        connection.close()
    
    return jsonify(dataList)
