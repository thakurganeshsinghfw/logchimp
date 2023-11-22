---
title: Local Setup
marp: true
theme: default
---

# Pre requisites

* Node v18 or higher
* Docker
  
---
# Local Setup

---

## Cloning repo

1. Clone the [Logchimp Repo](https://github.com/thakurganeshsinghfw/logchimp/) Locally
2. From terminal run `npm install` or `yarn install`

---

## DB Setup

1. Run a postgres docker container with following command
    ```sh
    docker run --name my_postgres_db -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -v logchimp_db_data:/var/lib/postgresql/data -d postgres
    ```
2. Run a adminer docker container locally using following command
    ```sh
    docker run --name my_adminer -d --link my_postgres_db:postgres -p 8080:8080 adminer
    ```
3. Navigate to [Adminer Home Page](http://localhost:8080) and login to db with following credentials
    ```yml
    db_name: postgres
    db_port: 5432
    db_user: postgres
    db_password: mysecretpassword
    ```

---
## Configurations

1. Create a file with name `logchimp.config.json` in the root folder
2. Add the following content to the file (change as applicable)
    ```json
    {
        "database": {
            "host": "localhost",
            "user": "postgres",
            "password": "mysecretpassword",
            "name": "postgres",
            "port": 5432,
            "ssl": false
        },
        "theme": {
            "standalone": "true"
        },
        "server": {
            "port": 3000,
            "secretKey": "FreshDevRel-SecReT"
        },
        "mail": {
            "service": "maildev",
            "host": "localhost",
            "port": 1025,
            "user": "gitpod",
            "password": ""
        }
    }
    ```
---

## Running Mail Server

From a new terminal, Run a maildev docker container locally using following command
```sh
docker run -p 1080:80 -p 1025:25 -d djfarrelly/maildev
```

---

## Running Backend Server

1. From a new terminal, navigate to the server package to start the backend server on port `3000` with following commands
    ```sh
    cd packages/server
    yarn dev
    ```
2. The output should be as follows
    ```sh
    yarn run v1.22.19
    $ nodemon index.js
    [nodemon] 3.0.1
    [nodemon] to restart at any time, enter `rs`
    [nodemon] watching path(s): *.*
    [nodemon] watching extensions: js,mjs,cjs,json
    [nodemon] starting `node index.js`
    info: LogChimp is running in development... {"timestamp":"2023-11-22 13:50:36 +05:30"}
    info: Listening on port: 3000 {"timestamp":"2023-11-22 13:50:36 +05:30"}
    info: Ctrl+C to shut down {"timestamp":"2023-11-22 13:50:36 +05:30"}
    info: LogChimp boot 1.554s {"timestamp":"2023-11-22 13:50:36 +05:30"}
    info: Database migration complete {"timestamp":"2023-11-22 13:50:36 +05:30"}
    ```
3. Navigate to [API Docs](http://localhost:3000/api-docs/) to validate backend is running successfully.

---

## Running Frontend Server

1. Navigate to the theme package to start the frontend server on port `9090` with following commands
    ```sh
    cd packages/theme
    yarn dev
    ```
2. The output shoud be as follows
    ```sh
    yarn run v1.22.19
    warning package.json: No license field
    warning ../../../package.json: No license field
    $ yarn cache clean && vite
    warning package.json: No license field
    warning ../../../package.json: No license field
    success Cleared cache.
    http://localhost:3000

    VITE v3.2.7  ready in 852 ms

    ➜  Local:   http://localhost:9090/
    ➜  Network: use --host to expose
    ```

---

# Configuring the application

1. Create a New Account by following the UI steps
2. Create a New Board  by following the UI steps