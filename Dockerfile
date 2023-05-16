# Use an official Node.js runtime as a parent image
FROM node:12-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire app directory to the container
COPY . .

# Build the app
RUN npm run build

# Install serve to serve the production build
RUN npm install -g serve

# Expose port 80
EXPOSE 5001

# Start the app using serve
CMD ["serve", "-s", "build", "-l", "5001"]
