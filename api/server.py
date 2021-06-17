from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:testtest123@localhost:23306/sultstua"
db = SQLAlchemy(app)

from autogen_sqla import *;




@app.route("/")
def main():
    return "Helo World!"



@app.route('/new-tournament',methods=['GET'])
def new_tournament():
    db.session.add(Tournament(name="Test"))
    db.session.commit()
    return "Test tournament added!"

if __name__ == "__main__":
    app.run()
