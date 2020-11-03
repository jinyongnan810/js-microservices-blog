### Create docker images

```bash
cd posts
docker build -t jinyongnan/posts:0.0.1 .
```

### Run kubernetes

```bash
cd infra/k8s
kubectl apply -f posts.yaml # (manipulating indivisual pod)
kubectl apply -f posts-depl.yaml # (manipulating pods by Deployment)
kubectl get pods
kubectl get deployemnts # get deployments
kubectl decribe pod posts
kubectl exec -it posts -- sh
kubectl delete pod posts
kubectl delete deployment posts-deplt # delete deployment
```

### Steps of a update

```bash
1.build new code with no version specified
docker build -t jinyongnan/posts
2.push to docker-hub
docker push jinyongnan/posts
3.kubectl rollout restart deployment post-depl
```
