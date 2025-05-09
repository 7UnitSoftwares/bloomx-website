# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Install dependencies required for sharp
RUN apk add --no-cache python3 make g++ vips-dev

# Install dependencies first (better caching)
COPY package*.json ./

# Install sharp explicitly
RUN npm install sharp

# Install other dependencies
RUN npm ci

# Copy rest of the application
COPY . .

# Set build-time arguments
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_API_KEY

# Set environment variables
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_KEY=$NEXT_PUBLIC_API_KEY
ENV NODE_ENV=production

# Build application
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
