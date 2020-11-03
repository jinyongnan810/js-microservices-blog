### Create docker images

```bash
cd posts
docker build -t jinyongnan/posts:0.0.1 .
```

### Run kubernetes(manipulating indivisual pod)

```bash
cd infra/k8s
kubectl apply -f posts.yaml
kubectl get pods
kubectl decribe pod posts
kubectl exec -it posts -- sh
kubectl delete pod posts
```
