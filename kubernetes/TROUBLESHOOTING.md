# Kubernetes Deployment Troubleshooting Guide

This guide provides steps to troubleshoot common issues with Kubernetes deployments.

## Common Issues and Solutions

### 1. Image Pull Errors

If pods are stuck in `ImagePullBackOff` or `ErrImagePull` status:

```bash
# Check for image pull events
kubectl get events -n default | grep -i "image"

# Check the pod details
kubectl describe pod <pod-name> -n default
```

**Solutions:**
- Verify the image name and tag are correct
- Ensure the registry credentials are correct
- Change `imagePullPolicy` to `IfNotPresent` if using local images
- For private registries, set up a Kubernetes Secret and ImagePullSecrets

### 2. Pod Startup Failures

If pods crash or restart repeatedly:

```bash
# Check pod status
kubectl get pods -n default

# View pod logs
kubectl logs <pod-name> -n default

# Describe the pod
kubectl describe pod <pod-name> -n default
```

**Solutions:**
- Check application logs for errors
- Verify environment variables
- Ensure resource limits are sufficient
- Check liveness and readiness probe configurations

### 3. Service Connection Issues

If you can't connect to your service:

```bash
# Check service details
kubectl get svc -n default
kubectl describe svc express-server-service -n default

# Test the connection within the cluster
kubectl run temp-pod --rm -i --tty --image=busybox -- wget -qO- http://express-server-service
```

**Solutions:**
- Verify service selector matches pod labels
- Check that ports are correctly configured
- For NodePort services, ensure the port is accessible

### 4. Deployment Rollout Issues

If deployments get stuck during rollout:

```bash
# Check deployment status
kubectl rollout status deployment/express-server-deployment -n default

# View deployment details
kubectl describe deployment express-server-deployment -n default
```

**Solutions:**
- Check readiness probe configuration
- Adjust deployment strategy parameters
- Increase resource limits
- Check for dependency issues

## Useful Commands

```bash
# View all resources
kubectl get all -n default

# Stream logs from a pod
kubectl logs -f <pod-name> -n default

# Execute a command in a pod
kubectl exec -it <pod-name> -n default -- /bin/sh

# Port forward to a service for local testing
kubectl port-forward svc/express-server-service 8080:80 -n default

# Delete and recreate the deployment
kubectl delete -f kubernetes/deployment.yaml -n default
kubectl apply -f kubernetes/deployment.yaml -n default
```

## Pipeline Integration Tips

- Use shorter timeouts initially (60s) to avoid long waits
- Add diagnostic commands that run even if the deployment fails
- Check both logs and events
- Consider using a canary deployment strategy for production
