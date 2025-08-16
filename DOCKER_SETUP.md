# Docker Setup for Bloom Website

## Prerequisites
- Docker and Docker Compose installed
- Node.js 18+ (for local development)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# API Configuration
NEXT_PUBLIC_API_BASE_URL=your_api_base_url_here
NEXT_PUBLIC_API_KEY=your_api_key_here

# Node Environment
NODE_ENV=production
```

## Building and Running

### Option 1: Direct Docker Build
```bash
# Build the image
docker build -t bloomx-website .

# Run the container
docker run -d -p 3000:3000 --name bloomx-website bloomx-website
```

### Option 2: Using Docker Compose
```bash
# Build and run the production version
docker-compose up web-staging

# Or run in background
docker-compose up -d web-staging
```

### Option 3: Development Mode
```bash
# Run in development mode with hot reload
docker-compose up web
```

## Ports
- Development: `http://localhost:3000`
- Production: `http://localhost:3001`

## Why No Standalone Output?

This Docker setup intentionally avoids `output: 'standalone'` because:

1. **Social Media Compatibility**: Standalone output can cause 418 errors and issues with Open Graph images
2. **Open Graph Support**: Better compatibility with social media previews and meta tags
3. **Twitter Cards**: Improved support for Twitter image generation
4. **Meta Tag Functionality**: Preserves all SEO and social media meta tags

## Troubleshooting

### Build Issues
If you encounter build issues:
1. Make sure you have the latest dependencies: `npm install`
2. Clear Docker cache: `docker system prune -a`
3. Verify the build completes successfully: `npm run build`

### Runtime Issues
1. Check container logs: `docker logs <container_name>`
2. Verify environment variables are set correctly
3. Ensure ports are not already in use

### Social Media Issues
1. Test Open Graph images: `https://www.opengraph.xyz/`
2. Test Twitter Cards: `https://cards-dev.twitter.com/validator`
3. Clear social media cache using their debugging tools

## Production Deployment

This setup creates a production-ready container that:
- Includes all necessary dependencies
- Preserves social media functionality
- Maintains SEO optimization
- Supports Open Graph and Twitter Cards

## Testing Social Media Previews

After deployment, test your social media previews:
1. Use the debug page at `/debug` to test Open Graph images
2. Test with social media debugging tools
3. Verify meta tags are properly generated
