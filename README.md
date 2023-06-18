# Home Library Service

## Endpoints
  You can find endpoints for this application in [task assignments](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/authentication/assignment.md)

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://docs.docker.com/get-docker/)

## Installing
1. Clone this repository

```sh
git clone git@github.com:AlexanderSUS/nodejs2022Q2-service.git
```
2. Go to `nodejs2022Q2-service` directory 
```sh
cd nodejs2022Q2-service
```

3. Install npm modules

```sh
npm install
```
5. Rename file `.env.example` to `.env` at src folder



## Running application
To run application you should install [Docker](https://docs.docker.com/get-docker/)

Firs you should build the app
```sh
npm run build
```


Then run command
```sh
docker compose up
```
Application will run in docker containers in development mode.

At the first time you should run migrations with command
```sh
docker exec app npm run migration:run
```

To stop docker container run command
```sh
docker compose down
```

### Migration

To generate migration
```sh
docker exec app npm run migration:generate
```
This command will generate migration that you can find in `dist/migrations/` folder.

To run migration run command
```sh
docker exec app npm run migration:run
```

OR instead both command above run command bellow, this generate and run migrations
```sh
npm run migrate:docker
```



### Vulnerability scanning

After `docker compose up` command will be completed you can scan built images for vulnerabilities with command
```sh
npm run scan
```

### Swagger
After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/api/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```sh
npm run test
```

To run only one of all test suites

```sh
npm run test -- <path to suite>
```

To run all test with authorization

```sh
npm run test:auth
```

To run only specific test suite with authorization

```sh
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```sh
npm run lint
```

```sh
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
