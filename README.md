# Awesome Project Build with TypeORM
Author: MP
Description: Exercise to get the top stories from HACKER NEWS API: https://github.com/HackerNews/API

###Install Dependencies
    a. Nodejs tested on (14.15)
    b. snap
    c. Docker
1. cd backend-express-app
2. sudo sh init-script.sh
NOTE: You can skip this

#To create the mysql instance using docker 
1. cd backend-express-app
2. npm run docker:dev

###Steps to run this project:
1. cd backend-express-app
2. To install dependencies, run `npm install` command
3. To build, run `npm run build` command
4. To start application, run `npm run start` command

###There are 2 api calls:
#### GET top stories with limit param
http://localhost:3000/stories/get-top-stories/50

#### SAVE top stories with limit param
curl -d '{"limit": "5"}' \-H "Content-Type: application/json" \-X POST http://localhost:3000/stories/save-top-stories

#### DB Configuration
.env creadentials file.
DB_PORT=3308 //configured port for docker image.
DB_HOST=localhost
DB_NAME=hacker_news_db
DB_USER=test
DB_PASSWORD=test
