FROM node:18-alpine

WORKDIR /home/desafio-back

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

EXPOSE 3001

CMD yarn start:dev

