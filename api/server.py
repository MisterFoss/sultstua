from flask import Flask, request, jsonify, g
from flask_cors import CORS
import pymysql.cursors
import json
import sys
from dotenv import dotenv_values

app = Flask(__name__)
# CORS(app)

env = dotenv_values("/run/secrets/flask.env")
if env is None:
    print("This is run without docker")
    sys.exit(1)

mysql_host = env["FLASK_MYSQL_HOST"]
mysql_port = env["FLASK_MYSQL_PORT"]

if mysql_port is None:
    print("No FLASK_MYSQL_PORT env variable set")
else:
    mysql_port = int(mysql_port)

mysql_user = env["FLASK_MYSQL_USER"];
mysql_user_password = open("/run/secrets/mysql_user_password").readline().rstrip()

mysql_database = env["FLASK_MYSQL_DATABASE"]



def connect_db():
    return pymysql.connect(
        host=mysql_host,
        port=mysql_port,
        user=mysql_user,
        password=mysql_user_password,
        db=mysql_database,
        autocommit=True,
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )

def get_db():
    '''Opens a new database connection per request.'''        
    if not hasattr(g, 'db'):
        g.db = connect_db()
    return g.db    

@app.teardown_appcontext
def close_db(error):
    '''Closes the database connection at the end of request.'''    
    if hasattr(g, 'db'):
        g.db.close()    




@app.route('/api')
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

@app.route('/api/createTournament', methods=['POST'])
def createTournament():
    tournamentData = request.get_json(force=True)
    cursor = get_db().cursor()
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
    return "Added!"



sql_get_all_anime = """
    SELECT * FROM `anime`
"""
@app.route('/api/testQual')
def displayQualifier():
    dataList = []
    cursor = get_db().cursor()
    cursor.execute(sql_get_all_anime)
    for blob in cursor.fetchall():
        dataList.append(json.loads(blob["data"]));
    
    return jsonify(dataList)



count_tournament_animes = """
SELECT tournament_id, COUNT(*)
    FROM tournament_anime
    GROUP BY tournament_id
"""

sql_get_anime_for_tournament = """
    select anime.*
        from tournament_anime
        join anime on anime_id = anime.id
        where tournament_id = %s
"""

sql_get_tournament_name = """
    SELECT name
    FROM  tournament
    WHERE id = %s
"""
# /getTournament/8
@app.route('/api/getTournament/<int:tournament_id>')
def displayPreliminaryForTournament(tournament_id):
    dataList = []
    cursor = get_db().cursor()
    cursor.execute(sql_get_anime_for_tournament, (tournament_id))
    rows = cursor.fetchall();

    for row in rows: 
        dataList.append(json.loads(row["data"]))
    

    
    cursor.execute(sql_get_tournament_name, (tournament_id))
    

    tour = dict()
    tour["animes"] = dataList
    tour["tournamentName"] = cursor.fetchone()["name"]

    return jsonify(tour)


sql_create_dommer = """
insert into dommer(name)
	value(%s);
"""

sql_get_tournament_index = """
SELECT *
    FROM tournament;
"""

@app.route('/api/index')
def getTourList():
    cursor = get_db().cursor()
    cursor.execute(sql_get_tournament_index)
    rows = cursor.fetchall();
    print(rows)
    return jsonify(rows)

sql_get_dommer_name = """
    SELECT id
        FROM dommer
        WHERE name = %s
    """
sql_write_dommer_score = """
    REPLACE tournament_prelim
        (dommer_id, tournament_anime_id, score)
    SELECT %s as dommer_id, tournament_anime.id as tournament_anime_id, %s as score
        FROM tournament_anime
        WHERE anime_id = %s and tournament_id = %s;
    """

@app.route('/api/score', methods=['POST'])
def scoreAnime():
    scoreData = request.get_json(force=True)

    tournamentId = scoreData["tournamentId"] 
    anilistId = scoreData["animeId"]
    judgeName = scoreData["judgeName"]
    score = scoreData["score"]

    cursor = get_db().cursor()
    cursor.execute(sql_get_dommer_name, judgeName)
    nameOnFile = cursor.fetchone();

    if nameOnFile is None:
        return
    
    dommerId = nameOnFile["id"]


    return

sql_write_dommer_score = """
    INSERT INTO tournament_prelim
        (dommer_id, tournament_anime_id, score)
    SELECT * FROM (
        SELECT %s as dommer_id, tournament_anime.id as tournament_anime_id, %s as score
            FROM tournament_anime
            WHERE anime_id = %s and tournament_id = %s
    ) as new
    ON DUPLICATE KEY UPDATE score = new.score;
    """
@app.route("/api/test")
def test():
    cursor = get_db().cursor()
    cursor.execute(sql_write_dommer_score, (1, 34, 63, 9))
    # rows = cursor.fetchall();
    return 




if __name__ == "__main__":
    app.run()
