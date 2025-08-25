# CI/CD Pipeline Documentation

This document explains the continuous integration and continuous deployment (CI/CD) pipeline set up for the Express.js application.

## Pipeline Overview

The CI/CD pipeline is implemented using Azure DevOps Pipelines and consists of two main stages:

1. **Build and Test Stage**
   - Install dependencies
   - Run linting
   - Run unit tests
   - Build the application
   - Build Docker image
   - Push Docker image to registry

2. **Deploy Stage**
   - Install kubectl if needed
   - Configure kubectl
   - Update Kubernetes manifests
   - Deploy to Kubernetes
   - Verify deployment

## Pipeline Variables

The pipeline uses the following variables that should be configured in Azure DevOps:

| Variable | Description |
|----------|-------------|
| `dockerRegistry` | URL of your Docker registry |
| `imageName` | Name of the Docker image |
| `k8sNamespace` | Kubernetes namespace to deploy to |
| `registryUser` | Username for Docker registry |
| `registryPassword` | Password for Docker registry |
| `kubeconfig` | Kubernetes configuration for accessing the cluster |
| `Environment` | Deployment environment (Development, Staging, Production) |

## Setting Up Environment Variables

To set up environment variables in Azure DevOps:

1. Go to **Pipelines** > **Library**
2. Create a variable group (e.g., "Development")
3. Add the required variables and their values
4. Link the variable group to your pipeline

## Docker Image Build and Push

The pipeline builds a Docker image using the Dockerfile in the `docker/` directory and tags it with both the build number and `latest`. 

The image is then pushed to your container registry. Make sure your self-hosted agent has Docker installed and has permissions to push to your registry.

## Kubernetes Deployment

The pipeline deploys the application to Kubernetes by:

1. Updating the image tag in the deployment YAML file
2. Applying the deployment and service YAML files
3. Waiting for the deployment to complete

Make sure your self-hosted agent has access to your Kubernetes cluster.

## Configuring Different Environments

You can set up different environments (Development, Staging, Production) by:

1. Creating variable groups for each environment
2. Creating Kubernetes namespace for each environment
3. Updating the pipeline to use the appropriate variable group and namespace

## Troubleshooting

If the pipeline fails:

1. Check the pipeline logs for error messages
2. Verify Docker registry credentials
3. Verify Kubernetes cluster access
4. Check that all required variables are set
5. Verify the self-hosted agent has all required dependencies installed
