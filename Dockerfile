FROM node:18-alpine as builder

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

CMD ["npm", "start"]