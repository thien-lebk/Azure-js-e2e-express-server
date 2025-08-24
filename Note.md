How to build

# Navigate to the project root directory
cd /Users/ad/Documents/GitHub/Azure-js-e2e-express-server

# Build the Docker image
docker build -t express-server -f docker/DOCKERFILE .

# Run the container
docker run -p 3000:3000 express-server

# Kubernetes Deployment with Minikube

## Start Minikube (if not already running)
minikube start

## Configure Docker to use Minikube's Docker daemon
eval $(minikube docker-env)

## Build for Kubernetes (using Minikube's Docker daemon)
docker build -t express-server:latest -f docker/DOCKERFILE .

## Deploy to Kubernetes
kubectl apply -f kubernetes/deployment.yaml
kubectl apply -f kubernetes/service.yaml

## Check Kubernetes status
kubectl get pods
kubectl get services

## Access the application
minikube service express-server-service

## Cleanup Kubernetes resources
kubectl delete -f kubernetes/deployment.yaml
kubectl delete -f kubernetes/service.yaml

## Stop Minikube when done
minikube stop