FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

RUN npm install -g http-server

EXPOSE 8080

CMD ["http-server", "build", "-p", "8080"]