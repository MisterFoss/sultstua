from flask import Flask

import config
import db
from routes import app

if __name__ == "__main__":
    app.run()
