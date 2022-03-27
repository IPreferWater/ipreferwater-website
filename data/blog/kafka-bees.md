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
- monitoring how much bees enter and leave the hives
- tracking the number of asian-wasp that came to kill our bees
- a sink kafka-connect-jdbc to store the data of your bees

I used [Ebiten](https://ebiten.org/) for the graphical part
Kafka to stream the data

![gui](/blog/kafka-bees/gui.webp)

### Technicals explications

#### requierements
you need
- [gcc](https://gcc.gnu.org/install/binaries.html) & [golang](https://go.dev/doc/install) for ebiten
- [docker](https://docs.docker.com/get-docker/) to start kafka, schema-registry, akhq, postgres, adminer


#### kafka

```
docker-compose up -d kafka
```
this will start [zookeeper](https://zookeeper.apache.org/), [schema-registry](https://docs.confluent.io/platform/current/schema-registry/index.html) (help to specify the format of your data), [akhq](https://akhq.io/) (monitoring the data inside kafka)

#### schema-registry

Everytimes an insect go near the scanner, it will get 
- a hashmap of the colors in format ["color_name"]percentage
- the size scanned 
- the direction (entering or leaving)
- if wings have been detected (could be usefull for making alert on bear paws ...)
As we know the format of the data, we can use [Avro](https://avro.apache.org/) format to securise & speed up our streaming

schema-key 
schema-value TODO put github url
(this one too, to be using with kafka connect later)

we need to post this on the schema-registry
```
post SCHEMA_REGISTRY_URL/subjects/SCHEMA_NAME/versions { "schema": "YOUR_SCHEMA_ESCAPED"}
```
! please use the schema name : **"detected-key"** & **""detected-value**
to get the expected format you can go on my avro-converter, it will transform your avro-schema to a curl usable with the schema-registry

response should be an ID
```
{"id": 1}
```

TODO url collection


#### start


OK, now start the program ! in the go folder
```
go run .
```

Now let's verify our scanner is working in Akhq.

```
localhost:8085
```
in the topics page
![akhq kafka](/blog/kafka-bees/akhq_kafka.png)

if you click on topic **detected**
![akhq detected](/blog/kafka-bees/akhq_detected.png)

if you click on topic **european-bee**
![akhq european bee](/blog/kafka-bees/akhq_european-bee.png)
the topic **detected** contain the data scanned

## OK but what's happening ?

Our scanned detected something to be scanned, he send the data to the [producer](https://github.com/IPreferWater/kafka-bees/blob/master/go/kafkabee/producer.go)

The **producer** will publish on topic **detected** but he needs the avro-schema

He will [ask](https://github.com/IPreferWater/kafka-bees/blob/15b7d9c414fe8a7f5e36f6c901f57b4bd888fce3/go/kafkabee/schema_registry.go#L11) for the schemas and [encode](https://github.com/IPreferWater/kafka-bees/blob/15b7d9c414fe8a7f5e36f6c901f57b4bd888fce3/go/kafkabee/schema_registry.go#L11) the data to avro-format

He [publishes](https://github.com/IPreferWater/kafka-bees/blob/master/go/kafkabee/producer.go#L110) the kafka-message and now we can see it on AKHQ on the topic **detected**

The **schema** tab on AKHQ represent the schema'ID you received when you posted it



We also have a [consumer](https://github.com/IPreferWater/kafka-bees/blob/master/go/kafkabee/consumer.go) that read the messages from **detected**
On the AKHQ topics page, this is the consumer lag. How many messages the consumer still have to read.

He [decode](https://github.com/IPreferWater/kafka-bees/blob/15b7d9c414fe8a7f5e36f6c901f57b4bd888fce3/go/kafkabee/schema_registry.go#L58) the message and [obtain](https://github.com/IPreferWater/kafka-bees/blob/15b7d9c414fe8a7f5e36f6c901f57b4bd888fce3/go/kafkabee/schema_registry.go#L90) the schema ID, now he knows what's the expected format and can construct the object

Once we have it, we can try to [guess](https://github.com/IPreferWater/kafka-bees/blob/15b7d9c414fe8a7f5e36f6c901f57b4bd888fce3/go/kafkabee/guess.go#L6) wich kind on insect it is, in this scenario, if it's an european-bee, we [publish](https://github.com/IPreferWater/kafka-bees/blob/15b7d9c414fe8a7f5e36f6c901f57b4bd888fce3/go/kafkabee/guess.go#L13) it to the topic **eurpean-bee** otherwise we just [write an alert](https://github.com/IPreferWater/kafka-bees/blob/15b7d9c414fe8a7f5e36f6c901f57b4bd888fce3/go/kafkabee/guess.go#L26) on the console


Ok, now we would like to store this bees in a database to make statistic.
But is there something quick ? [kafka-connect](https://www.confluent.io/fr-fr/blog/kafka-connect-tutorial/)

### Kafka-connect

start the services
```
docker-compose up kafka-connect
```
for the database
```
docker-compose up -d postgres
docker-compose up -d adminer
```

post the [configuration](https://github.com/IPreferWater/kafka-bees/blob/15b7d9c414fe8a7f5e36f6c901f57b4bd888fce3/kafka-connect/connector-config-dev.json)
```
post KAFKA_CONNECT_URL/connectors/CONFIG_NAME/CONFIG { YOUR_CONFIG }
```

visit [Adminer](https://www.adminer.org/)
```
localhost:8080
```

on authentification page enter the informations from [the docker-compose](https://github.com/IPreferWater/kafka-bees/blob/15b7d9c414fe8a7f5e36f6c901f57b4bd888fce3/docker-compose.yml#L91)

```
System :Postgres
Server :postgres
User :beekeeper	
Password :beepassword
Database :bees	
```

You should see all your bees stored an available for any SQL request

![adminer bees](/blog/kafka-bees/adminer.png)
