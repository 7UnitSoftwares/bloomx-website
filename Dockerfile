# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies needed for build)
RUN npm install

# Copy all files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Create necessary directories
RUN mkdir -p .next/static data src/data

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Copy data files (blog posts and auth database)
# These files are critical and must be preserved
# 
# IMPORTANT: 
# - auth.json contains user accounts and is copied from src/data/auth.json
# - If auth.json is missing, it will be auto-created with root user on server startup
# - Root credentials: root@bloom-bi.it / rootWinterStrike
# - The initialization code in auth-db.js runs on module import (server startup)
COPY --from=builder /app/data ./data
COPY --from=builder /app/src/data ./src/data

# Ensure data directories exist and have proper permissions
RUN chmod -R 755 data src/data || true

# Expose the port the app runs on
EXPOSE 3000

# Set the command to run the app
CMD ["npm", "start"]
