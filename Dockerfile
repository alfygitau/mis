# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Install pm2 and serve globally
RUN npm install -g pm2 serve

# Copy the rest of the application code to the working directory
COPY . .

# Build the Vite app for production
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to start the app using pm2
CMD ["pm2-runtime", "npm", "--", "start"]
