#!/bin/bash

# Backup script for blog posts and auth database
# Run this before deployment to create a backup

BACKUP_DIR="backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "📦 Creating backup of data files..."

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Backup blog posts
if [ -f "data/blog-posts.json" ]; then
    cp "data/blog-posts.json" "$BACKUP_DIR/blog-posts_$TIMESTAMP.json"
    echo "✅ Blog posts backed up to $BACKUP_DIR/blog-posts_$TIMESTAMP.json"
else
    echo "⚠️  Blog posts file not found!"
fi

# Backup auth database
if [ -f "src/data/auth.json" ]; then
    cp "src/data/auth.json" "$BACKUP_DIR/auth_$TIMESTAMP.json"
    echo "✅ Auth database backed up to $BACKUP_DIR/auth_$TIMESTAMP.json"
else
    echo "⚠️  Auth database file not found!"
fi

echo ""
echo "📊 Backup complete!"
echo "Backup location: $BACKUP_DIR/"

