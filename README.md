# Sultstua


```
    export REPO=/mnt/d/git/sultstua
```


## Setup the dev-environment

### Installations

#### Docker

Follow the instructions to install [docker](https://docs.docker.com/engine/install/ubuntu/) and [docker-compose](https://docs.docker.com/compose/install/)

```
cd $REPO
sudo service docker start
docker-compose up -d
```

To set up (or reset) the initial database in mysql:

```
docker-compose exec mysql mysql -p
< # Enter the password from the `./secrets/<env>/mysql_root_password
mysql> source /app/db/initial-tables.sql 
```

To see the logs from the api-server:

```
docker-compose logs -f api
```
