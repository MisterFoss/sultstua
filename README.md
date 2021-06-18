# Sultstua


```
export REPO=/mnt/d/git/sultstua
```


## Setup the dev-environment

### Installations

#### Docker

Follow the instructions to install [docker](https://docs.docker.com/engine/install/ubuntu/) and [docker-compose](https://docs.docker.com/compose/install/)

#### Python

Ensure you're using python 3.x.

Install python's [virtualenv](https://virtualenv.pypa.io/en/latest/) systemwide

Install [flask](https://flask.palletsprojects.com/en/2.0.x/), [sqlalchemy](https://www.sqlalchemy.org/) with [alembic](https://github.com/sqlalchemy/alembic) and [flask-sqlalchemy](https://github.com/pallets/flask-sqlalchemy) inside the virtualenv

```
cd $REPO/api
virtualenv .venv;
.venv/bin/pip install flask alembic flask-sqlalchemy pymysql sqlacodegen flask-cors
```


pip install flask-cors

### Starting

#### Docker

```
cd $REPO
docker-compose up -d
```

#### Python API

```
cd $REPO/api
source .venv/bin/activate
export FLASK_APP=server
alembic upgrade head
sqlacodegen mysql+pymysql://root:testtest123@localhost:23306/sultstua > autogen_sqla.py
flask run
```

The api should now be running on `localhost:5000`

#### Python Web

```
cd $REPO/web
python -m http.server
```

The web-files should now be server on `localhost:8000`
