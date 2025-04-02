FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Ensure fonts are properly copied to the build output
RUN mkdir -p build/fonts && cp -r static/fonts/* build/fonts/

EXPOSE 8080

CMD ["node", "server.js"]