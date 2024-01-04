---
title: 'CKAD'
date: '2023-12-01'
description: 'Kubernetes certification tips'
category: 'code kubernetes ckad'
icon: '/blog/ckad/icon.webp'
---

### Intro
I will give you some tips that helped me to obtain the CKAD Certification.

I took the [Udemy Mumshad Mannambeth's course](https://www.udemy.com/course/certified-kubernetes-application-developer/) this will also give you free access to  [kode-cloud lab's](https://kodekloud.com/courses/labs-certified-kubernetes-application-developer/)

## Price

When ordering your [linux voucher](https://training.linuxfoundation.org/certification/certified-kubernetes-application-developer-ckad/) or any course which you want to buy, you need to :

- create your account
- add your product in the basket
- **WAIT**

This is called an [abandoned basket](https://www.arimetrics.com/en/digital-glossary/abandoned-cart), most of the website will encourage you to finish your transaction with a discount.

I saved **50%** on Linux voucher and **80%** on udemy's course


## check services
Working with services, you might need to quickly check if the pods are correctly exposed.

you can do it by checking the number of endpoint

```
k create deploy random-deploy --image=nginx:alpine -r=4
k expose deploy random-deploy --port=8080
k describe svc
```
result
```
Endpoints: 10.244.0.5:8080,10.244.0.6:8080,10.244.0.7:8080 + 1 more...
```
you can see the **4 pods'ip** from the replication **4** of the deploy

When troubleshooting you see **0**, you might need to reconfigure the **service**

## reach api and save

This is a command you **will need** for your certification

You want to ensure that your api gives the right result and have a proof

in the previous example
- take the first ip of the pod exposed
- curl the endpoint
- save it to my-proof.txt

```
k run temp --restart=Never --rm -i --image=nginx:alpine -- curl 10.244.0.5 > my-proof.txt
```

now you should see the result

```
cat my-proof.txt

<!DOCTYPE html>
<html>
[.........]
[.........]
</html>
100   615  100   615    0     0   500k      0 --:--:-- --:--:-- --:--:--  600k
pod "temp" deleted
```
## Documentation's links

You already know you only have access to official documentation, here are my favorite pages

- in [persistent volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) page, learn by heart where to find an exemple of ressource [PersistentVolume](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistent-volumes) & [PersistentVolumeClaim](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistentvolumeclaims)

they are in the middle of the page & hard to find
You will have questions on this topic and need to be efficient

- on the leftside of the documentation  *Reference > Command line tool (kubectl) > kubectl Commands*

you have a wonderfull summary of all cmd possible

I used this page for the **rollout** command, this is also a recuring topic

- *leftside Reference > Kubernetes API > Workload Resources*

this page will give you possible fields for each resources

For example, you are asked to create a **job** which runs 4 pod in parallel
*Workload Resources > Job > ctrl + f "parallel"* and you immediately find the field's name **parallelism (int32)**

## Training

it might be complicated to find good exercices, [killer.sh](https://killer.sh/) is really good but it is already included in your **linux voucher**, here are two links I find usefull

- [linuxhubdatahub](https://linuxdatahub.com/ckad-exam-questions-for-practice/) this one is really good
- [github with exercices](https://github.com/dgkanatsios/CKAD-exercises/tree/main)
- chatgpt ... uses a prompt to work on the topic you have a bad time with (you need to use the context or it will tell you to just buy a course ...)

```
you are a teacher in a ckad school, you give me 5 questions on the topic of the ingress with the answer bellow the question in imperative command
```
if they are too easy
```
make them harder
```