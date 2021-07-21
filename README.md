# Awesome Project Build with TypeORM
Author: MP
Description: Exercise to get the top stories from HACKER NEWS API: https://github.com/HackerNews/API

###Dependencies
1. Nodejs tested on (14.15)
2. Docker

#To install other dependencies such as mysql and node modules 
1. cd nodejs-backend-app
2. npm run docker:dev

###Steps to run this project manually (mysql should be installed already):
1. cd nodejs-backend-app
2. Run `npm i` or `npm install` command
3. Setup database settings inside `ormconfig.ts` file
4. Run `npm start` command

##NOTE: In case the database does not create automatically
CREATE DATABASE hacker_news_db;
CREATE USER 'test'@'localhost' IDENTIFIED BY 'test';
GRANT ALL ON hacker_news_db.* TO 'test'@'localhost' IDENTIFIED BY 'test' WITH GRANT OPTION;
FLUSH privileges;

###There are 2 api calls:
#### GET top stories with limit param
http://localhost:3000/stories/get-top-stories/50

#### SAVE top stories with limit param
curl -d '{"limit": "5"}' \-H "Content-Type: application/json" \-X POST http://localhost:3000/stories/save-top-stories
