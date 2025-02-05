# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first
# COPY package*.json ./
# Copy the rest of the application code
COPY . ./

# Clear npm cache
RUN npm cache clean --force

# Install dependencies
RUN npm install  # Ensure dependencies are installed correctly


# Ensure next is installed
RUN ls -la node_modules/.bin/  # Debugging step to check if `next` is available

# Build the Next.js application
RUN npm run build  # Now this should work

# Expose the port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
