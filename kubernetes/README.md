# Kubernetes Deployment Guide for Express Server with Minikube

This guide explains how to deploy the Express.js application to Kubernetes using Minikube.

## Prerequisites

- Minikube installed and running
- kubectl CLI installed

## Deployment Steps

1. **Start Minikube (if not already running)**

   ```bash
   minikube start
   ```

2. **Set up Docker to use Minikube's Docker daemon**

   ```bash
   eval $(minikube docker-env)
   ```
   
   Note: This command configures your terminal session to use Minikube's Docker daemon. This is necessary so that the images you build are directly available to Minikube without needing to push them to a registry.

3. **Build the Docker image**

   ```bash
   # Navigate to the project root
   cd /Users/ad/Documents/GitHub/Azure-js-e2e-express-server
   
   # Build the Docker image (make sure you're using Minikube's Docker daemon)
   docker build -t express-server:latest -f docker/DOCKERFILE .
   ```

4. **Apply Kubernetes manifests**

   ```bash
   # Apply the deployment
   kubectl apply -f kubernetes/deployment.yaml
   
   # Apply the service
   kubectl apply -f kubernetes/service.yaml
   ```

5. **Verify the deployment**

   ```bash
   # Check pods
   kubectl get pods
   
   # Check service
   kubectl get services
   ```

6. **Access the application**

   ```bash
   # This will open the service in your default browser
   minikube service express-server-service
   ```
   
   Alternatively, you can get the URL with:
   
   ```bash
   minikube service express-server-service --url
   ```
   
   Or you can access it directly at http://$(minikube ip):30080

## Debugging

If pods are not starting correctly, you can check their status:

```bash
# Get detailed information about pods
kubectl describe pods

# View logs for a specific pod (replace pod-name with actual pod name)
kubectl logs pod-name
```

## Scaling the application

You can scale the deployment by modifying the `replicas` field in the deployment.yaml file or by running:

```bash
kubectl scale deployment express-server-deployment --replicas=3
```

## Cleanup

To remove the deployment and service:

```bash
kubectl delete -f kubernetes/deployment.yaml
kubectl delete -f kubernetes/service.yaml
```

To stop Minikube when you're done:

```bash
minikube stop
```

Or to delete the Minikube cluster completely:

```bash
minikube delete
```

## Troubleshooting

### Image Pull Issues

If you see `ImagePullBackOff` or `ErrImagePull` errors, it likely means Minikube can't find your Docker image. Make sure:

1. You've connected to Minikube's Docker daemon with `eval $(minikube docker-env)`
2. You've built the image with the correct name (`express-server:latest`)
3. The deployment.yaml has `imagePullPolicy: Never` to use local images only

### Connection Issues

If you can't access the service:

1. Verify the service is running: `kubectl get services`
2. Check the assigned NodePort: `kubectl describe service express-server-service`
3. Make sure Minikube is running: `minikube status`
4. Try accessing with the proper IP and port: `curl http://$(minikube ip):30080`
