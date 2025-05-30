# Build Stage 1
FROM node:18-alpine AS build
WORKDIR /app

# Add build argument for environment variable
ARG LANDING_PAGE_URL

# Set environment variable
ENV LANDING_PAGE_URL=$LANDING_PAGE_URL

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the entire project
COPY . .

# Build the project
RUN npm run build

# Production Stage
FROM node:18-alpine
WORKDIR /app

# Declare build arg again in second stage
ARG LANDING_PAGE_URL

# Set environment variable in runtime stage
ENV LANDING_PAGE_URL=$LANDING_PAGE_URL

# Copy only necessary files from build stage
COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/server.js ./

# Ensure fonts are properly copied
RUN mkdir -p build/fonts && cp -r static/fonts/* build/fonts/ || true

EXPOSE 8080

CMD ["node", "server.js"]