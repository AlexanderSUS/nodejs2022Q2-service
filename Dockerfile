FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci 

COPY . .

USER node

EXPOSE 4000

CMD ["npm", "run", "start:dev"]