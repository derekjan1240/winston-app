# Use the official Node.js image for version 20
FROM node:lts-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm ci

# Copy the rest of your application code to the container, excluding files specified in .dockerignore
COPY . .

# Expose the port your app runs on (if applicable)
EXPOSE 3000

# Use the --env-file flag to load environment variables and run your Node.js application
CMD ["node", "--env-file=.env", "index.js"]