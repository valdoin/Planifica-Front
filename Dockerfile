FROM node:lts-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "serve", "--", "--host", "0.0.0.0"]
