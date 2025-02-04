# Use the official Node.js image.
FROM node:18

# Set the working directory.
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock).
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of your application code.
COPY . .

# Build the Docusaurus site.
RUN npm run build

# Expose the port that the app runs on.
EXPOSE 8080

# Command to serve the built site.
# Command to serve the built site on port 8080.
CMD ["sh", "-c", "PORT=8080 npx serve build"]