# Authentication Database Setup

## Overview

The authentication system uses a JSON file at `src/data/auth.json` to store user accounts. This file is **critical** for admin access.

> **Lightweight gate:** even though full login is disabled, set the environment
> variable `ADMIN_ACCESS_CODE` to enforce the minimal passcode check on every
> `/admin` page. If you do nothing, the fallback code `bloom-team-2025`
> (configured in `src/lib/admin-gate.js`) will be used for all environments.

## Initial Setup

### Automatic Initialization

The system **automatically creates** the auth database and root user if they don't exist:

1. **On Server Startup**: When the application starts, it checks for `src/data/auth.json`
2. **If Missing**: Creates the file with root user automatically
3. **If Exists but Root Missing**: Adds root user to existing database

### Root User Credentials

When the auth database is auto-initialized, it creates:

- **Email**: `root@bloom-bi.it`
- **Username**: `root`
- **Password**: `rootWinterStrike`
- **Role**: `root`
- **Protected**: Cannot be deleted

## Docker/Kubernetes Deployment

### File Copying

The Dockerfile copies both data directories:

```dockerfile
COPY --from=builder /app/data ./data           # Blog posts
COPY --from=builder /app/src/data ./src/data  # Auth database
```

### If Files Are Missing

**Don't worry!** The system will auto-initialize:

1. If `src/data/auth.json` is missing → Created automatically with root user
2. If `src/data/auth.json` exists but is empty → Root user added automatically
3. If root user is missing → Root user added automatically

### First Login After Deployment

After deploying to Kubernetes:

1. **Check if file exists** (optional):
   ```bash
   kubectl exec -it <pod-name> -- ls -la src/data/auth.json
   ```

2. **Login with root account**:
   - Email: `root@bloom-bi.it`
   - Password: `rootWinterStrike`

3. **Check logs** if login fails:
   ```bash
   kubectl logs <pod-name> | grep -i auth
   ```

## Verification

### Check Auth Database Status

Run the debug script inside the pod:

```bash
kubectl exec -it <pod-name> -- npm run debug:auth
```

This will show:
- Whether auth.json exists
- Current users in database
- Whether root user exists
- File permissions

### Check Application Logs

Look for `[AUTH]` messages in logs:

```bash
kubectl logs <pod-name> | grep -i "\[AUTH\]"
```

You should see messages like:
- `[AUTH] Initializing auth database at: /app/src/data/auth.json`
- `[AUTH] ✅ Auth database initialized with root user`
- `[AUTH] ✅ Root user already exists in database`

## Manual Initialization

If you need to manually create the root user:

1. **Exec into the pod**:
   ```bash
   kubectl exec -it <pod-name> -- sh
   ```

2. **Create the file** (if it doesn't exist):
   ```bash
   mkdir -p src/data
   ```

3. **The system will auto-create it** on next access, OR you can trigger it by:
   ```bash
   node -e "require('./src/lib/auth-db.js')"
   ```

## Troubleshooting

### Issue: Cannot login with root@bloom-bi.it

**Check 1**: Verify file exists
```bash
kubectl exec -it <pod-name> -- cat src/data/auth.json
```

**Check 2**: Check if root user exists
```bash
kubectl exec -it <pod-name> -- npm run debug:auth
```

**Check 3**: Check application logs
```bash
kubectl logs <pod-name> | grep -i auth
```

**Solution**: The initialization code should create the root user automatically. If it doesn't:
1. Check file permissions
2. Check logs for errors
3. Restart the pod (will trigger initialization)

### Issue: File is empty after deployment

**Cause**: File wasn't copied during Docker build OR file was overwritten

**Solution**: 
1. The initialization code will detect this and add root user
2. Or manually trigger initialization by accessing any admin route

### Issue: "User not found" error

**Check**: Run debug script to see available users
```bash
kubectl exec -it <pod-name> -- npm run debug:auth
```

**Solution**: 
- If root user doesn't exist, restart pod (triggers initialization)
- Or manually add root user using the debug script output

## Security Notes

1. **Root Password**: Change root password after first login via admin interface
2. **File Permissions**: Ensure `src/data/auth.json` is not publicly accessible
3. **Backup**: Regularly backup `src/data/auth.json` before deployments
4. **Sessions**: Active sessions are stored in the same file (cleaned up automatically)

## Data Persistence

### In Docker Image
- Files are baked into the image
- ✅ Simple setup
- ⚠️ Data lost if pod restarts (unless using persistent volumes)

### With Persistent Volumes (Recommended)
- Use Kubernetes PersistentVolumes
- Data persists across pod restarts
- See `k8s/KUBERNETES_DEPLOYMENT.md` for setup

## Summary

✅ **You WILL be able to login** because:
1. The Dockerfile copies `src/data/auth.json` into the image
2. Even if the file is missing, it's auto-created on server startup
3. The root user is automatically added if missing
4. Initialization happens on module import (server startup)

**Root Credentials**: `root@bloom-bi.it` / `rootWinterStrike`

