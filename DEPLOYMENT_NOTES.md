# Deployment Notes

## Important: Data Files Preservation

This application uses JSON-based databases for:
- **Blog Posts**: `data/blog-posts.json`
- **Authentication**: `src/data/auth.json`

### ⚠️ CRITICAL: These files must be preserved during deployment!

These files contain all your blog content and user accounts. If they are lost or overwritten during deployment, all data will be lost.

## Current Data Files

Both files are tracked in git and should be included in your deployment:

1. **Blog Posts Database** (`data/blog-posts.json`)
   - Contains all blog posts and their content
   - Currently has 10 blog posts
   - Location: Root level `data/` directory

2. **Authentication Database** (`src/data/auth.json`)
   - Contains all user accounts (including root account)
   - Contains active sessions
   - Location: `src/data/` directory

## Deployment Checklist

### Before Deployment:
- ✅ Ensure both files are committed to git
- ✅ Verify files contain current data
- ✅ Backup files if needed

### During Deployment:
- ⚠️ **DO NOT** overwrite these files
- ⚠️ **DO NOT** initialize empty versions
- ⚠️ Ensure deployment process preserves these files

### After Deployment:
- ✅ Verify files exist on server
- ✅ Verify data is intact (check blog posts count, user accounts)
- ✅ Test login with root account
- ✅ Verify blog posts are visible on website

## Server-Specific Notes

### If Using Vercel/Netlify:
These platforms preserve files that are committed to git. Make sure:
- Files are committed before deployment
- Files are not in `.gitignore`
- Build process doesn't overwrite them

### If Using Custom Server:
1. Ensure files are copied during deployment
2. Set proper file permissions (read/write)
3. Ensure directory structure exists:
   - `data/` directory at root level
   - `src/data/` directory

### If Files Are Lost:
1. Restore from git repository
2. Or restore from backup
3. If neither available, manually recreate:
   - Root account: `root@bloom-bi.it` / `rootWinterStrike`
   - Blog posts: Recreate via admin interface

## Backup Strategy

### Manual Backup:
```bash
# Backup blog posts
cp data/blog-posts.json data/blog-posts.json.backup

# Backup auth database
cp src/data/auth.json src/data/auth.json.backup
```

### Automated Backup (Recommended):
Consider setting up automated backups of these files before deployment.

## File Permissions

Ensure the files have proper permissions:
- **Read**: Required for all operations
- **Write**: Required for creating/updating posts and users

On Unix/Linux servers:
```bash
chmod 644 data/blog-posts.json
chmod 644 src/data/auth.json
```

## Troubleshooting

### Issue: Files are empty after deployment
**Solution**: 
1. Check if files exist on server
2. Restore from git: `git checkout data/blog-posts.json src/data/auth.json`
3. Redeploy

### Issue: Files are overwritten during deployment
**Solution**:
1. Check deployment script/configuration
2. Ensure files are not being reinitialized
3. Add deployment step to preserve existing files

### Issue: Permission denied errors
**Solution**:
1. Check file permissions
2. Ensure server process has read/write access
3. Check directory permissions

## Current File Status

As of latest commit:
- ✅ `data/blog-posts.json` - Tracked in git
- ✅ `src/data/auth.json` - Tracked in git
- ✅ Both files contain current data

## Backup and Verification Scripts

### Backup Data (Before Deployment)
```bash
npm run data:backup
# or
bash scripts/backup-data.sh
```
This creates timestamped backups in the `backups/` directory.

### Verify Data (After Deployment)
```bash
npm run data:verify
# or
node scripts/verify-data.js
```
This checks that:
- Both data files exist
- Files contain data (not empty)
- Root user exists in auth database
- Blog posts count is correct

## Next Steps

1. **Backup current data** (recommended before deployment):
   ```bash
   npm run data:backup
   ```

2. **Commit current state** (if not already committed):
   ```bash
   git add data/blog-posts.json src/data/auth.json
   git commit -m "Preserve blog posts and auth database"
   git push
   ```

3. **Verify before deployment**: Check that files are in git
   ```bash
   git ls-files data/blog-posts.json src/data/auth.json
   ```

4. **Deploy**: Ensure deployment process preserves these files

5. **Verify after deployment**: Run verification script
   ```bash
   npm run data:verify
   ```

## Quick Commands Reference

```bash
# Backup data
npm run data:backup

# Verify data exists and contains content
npm run data:verify

# Check git status
git status data/blog-posts.json src/data/auth.json

# View recent commits of data files
git log --oneline -5 -- data/blog-posts.json src/data/auth.json
```

