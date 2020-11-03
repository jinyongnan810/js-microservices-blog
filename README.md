### Create docker images

```bash
cd posts
docker build -t jinyongnan/posts .
docker push jinyongnan/posts
```

### Run kubernetes

```bash
cd infra/k8s
kubectl apply -f posts.yaml # (manipulating indivisual pod)
kubectl apply -f posts-depl.yaml # (manipulating pods by Deployment)
kubectl apply -f posts-srv.yaml # create service to expose ports
kubectl get pods
kubectl get deployemnts # get deployments
kubectl get services # ger services
kubectl decribe pod posts
kubectl exec -it posts -- sh
kubectl delete pod posts
kubectl delete deployment posts-deplt # delete deployment
# deploy nginx ingress controller
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.40.2/deploy/static/provider/cloud/deploy.yaml
```

### Steps of a update(Production)

```bash
1.build new code with no version specified
docker build -t jinyongnan/posts
2.push to docker-hub
docker push jinyongnan/posts
3.kubectl rollout restart deployment posts-depl
```

### Steps of a update(Development)

- [install skaffold](https://skaffold.dev/docs/install/)
- run `skaffold dev`
- manually delete pods with `skaffold delete`
