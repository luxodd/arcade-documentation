FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

RUN npm install express

EXPOSE 8080

CMD ["node", "server.js"]