# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://docs.docker.com/get-docker/)

## Installing
1. Clone this repo

```
git clone git@github.com:AlexanderSUS/graphql-service.git
```
2. Go to `nodejs2022Q2-service` folder
```
cd nodejs2022Q2-service
```
4. Switch baranch
```
git checkout develop
```
4. Install npm modules. If you will run application only in docker container skip this step.
```
npm install
```
5. Rename file `.env.example` to `.env` at src folder

## Running application as is

**Production mode**

```
npm run start
```

**Development mode**

```
npm run start:dev
```

## Running application in docker container (development mode)

Run command

```
docker compose up
```

To stop docker container run command

```
docker compose down
```
### Vulnerability scanning

After `docker copose up` command will be completed you can scan built images for vulnerabilities

with command

```
npm run scan
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/api/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
