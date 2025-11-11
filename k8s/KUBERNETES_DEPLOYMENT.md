# Kubernetes Deployment Guide

## Important: Data Persistence

This application uses JSON-based databases that need to be preserved:

- **Blog Posts**: `data/blog-posts.json`
- **Authentication**: `src/data/auth.json`

## Current Setup

The Dockerfile has been updated to include these data files in the Docker image. However, for **persistent storage** in Kubernetes, you have two options:

### Option 1: Include in Docker Image (Current Setup)
- Data files are baked into the Docker image
- ✅ Simple setup
- ✅ Works for single-replica deployments
- ⚠️ Data is lost if pod restarts (unless using persistent volumes)
- ⚠️ Updates require rebuilding image

### Option 2: Use Persistent Volumes (Recommended for Production)

For production deployments with data that needs to persist across pod restarts, use Kubernetes PersistentVolumes.

## Setting Up Persistent Volumes

### 1. Create PersistentVolumeClaim

Create `k8s/pvc.yaml`:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: bloom-data-pvc
  namespace: default
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
  storageClassName: standard  # Change based on your GCP setup
```

### 2. Update Deployment to Use Volume

Add to `k8s/deployment.yaml`:

```yaml
spec:
  template:
    spec:
      containers:
      - name: bloom-website
        # ... existing config ...
        volumeMounts:
        - name: data-volume
          mountPath: /app/data
        - name: auth-data-volume
          mountPath: /app/src/data
      volumes:
      - name: data-volume
        persistentVolumeClaim:
          claimName: bloom-data-pvc
      - name: auth-data-volume
        persistentVolumeClaim:
          claimName: bloom-data-pvc
```

### 3. Apply Changes

```bash
kubectl apply -f k8s/pvc.yaml
kubectl apply -f k8s/deployment.yaml
```

## Initial Data Setup

### After First Deployment

1. **Check if root user exists**:
   ```bash
   kubectl exec -it <pod-name> -- cat src/data/auth.json
   ```

2. **If root user doesn't exist**, the initialization code will create it automatically on first access.

3. **Verify data files**:
   ```bash
   # Check blog posts
   kubectl exec -it <pod-name> -- cat data/blog-posts.json
   
   # Check auth database
   kubectl exec -it <pod-name> -- cat src/data/auth.json
   ```

## Root Account Login

### Default Root Credentials
- **Email**: `root@bloom-bi.it`
- **Password**: `rootWinterStrike`

### If Login Fails

1. **Check if auth.json exists**:
   ```bash
   kubectl exec -it <pod-name> -- ls -la src/data/
   ```

2. **Check file contents**:
   ```bash
   kubectl exec -it <pod-name> -- cat src/data/auth.json
   ```

3. **Check application logs**:
   ```bash
   kubectl logs <pod-name>
   ```

4. **If file is empty or missing**, check:
   - Data files were copied during Docker build
   - Persistent volume is mounted correctly
   - File permissions are correct

## Troubleshooting

### Issue: Cannot login with root account

**Possible causes:**
1. Auth database file is empty or missing
2. File permissions issue
3. Data not copied during Docker build

**Solutions:**
1. Check if file exists in container:
   ```bash
   kubectl exec -it <pod-name> -- ls -la src/data/auth.json
   ```

2. Check file contents:
   ```bash
   kubectl exec -it <pod-name> -- cat src/data/auth.json
   ```

3. If file is empty, verify it was included in Docker image:
   ```bash
   docker run --rm <image-name> cat src/data/auth.json
   ```

4. If file doesn't exist, the initialization code should create it. Check logs:
   ```bash
   kubectl logs <pod-name> | grep -i "auth\|root"
   ```

### Issue: Data files are empty after pod restart

**Solution**: Use PersistentVolumes (Option 2 above)

### Issue: Permission denied errors

**Solution**: Check file permissions:
```bash
kubectl exec -it <pod-name> -- ls -la src/data/
kubectl exec -it <pod-name> -- chmod 644 src/data/auth.json
kubectl exec -it <pod-name> -- chmod 644 data/blog-posts.json
```

## GCP-Specific Notes

### Using GKE Persistent Disks

For GCP, you might want to use GCE Persistent Disks:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: bloom-data-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
  storageClassName: standard-rwo  # GCP standard storage class
```

### Backup Strategy

For production, consider:
1. Regular backups of persistent volumes
2. Using GCP Cloud Storage for backups
3. Automated backup jobs in Kubernetes

## Verification Script

After deployment, verify data:

```bash
# Run verification script inside pod
kubectl exec -it <pod-name> -- node scripts/verify-data.js
```

Or use the npm script:
```bash
kubectl exec -it <pod-name> -- npm run data:verify
```

## Next Steps

1. ✅ Dockerfile updated to include data files
2. ⚠️ Consider adding PersistentVolumes for production
3. ✅ Verify data after deployment
4. ✅ Test root account login

