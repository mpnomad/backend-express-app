FROM node:14.15

WORKDIR /app

COPY ./package.json .

RUN npm install && npm cache clean --force

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
