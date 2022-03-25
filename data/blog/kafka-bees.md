---
title: 'kafka bees'
date: '2020-03-25'
description: 'monitoring your hives with kafka'
category: 'code'
---

### Functionnal Explications
In this github example you can find an application to monitore your hives
Lets imagine you have a scanner in the entry of the hive that give you data of what's scanned
This scanner stream the data to your kafka broker and you can handle your scenarios

In this project, the informations we are handling are
- monitoring how much bees go and leave the hive
- tracking the number of asian-wasp that came to kill our bees
- a sink kafka-connect-jdbc to store the bees

I used [Ebiten](https://ebiten.org/) for the graphical part
Kafka to stream the data


### Technicals explications

#### requierements
you need
- [gcc](https://gcc.gnu.org/install/binaries.html) & [golang](https://go.dev/doc/install) for ebiten
- [docker](https://docs.docker.com/get-docker/) to start kafka, schema-registry, akhq, postgres, adminer

#### start
```
docker-compose up -d kafka
```
this will start [zookeeper](https://zookeeper.apache.org/), [schema-registry](https://docs.confluent.io/platform/current/schema-registry/index.html) (help to specify the format of your data), [akhq](https://akhq.io/) (monitoring the data inside kafka)

In options, you can
-  adjust how many bees will come and leave your hives
-  how many asian-wasp will come to kill your bees