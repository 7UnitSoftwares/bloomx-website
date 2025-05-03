# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./

RUN npm install --package-lock-only

RUN npm ci

# Copy rest of the application
COPY . .

# Build application
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
