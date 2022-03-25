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
```
{
    "type": "record",
    "name": "DataKey",
    "namespace": "ipreferwater.todo",
    "fields": [
      {
        "name": "hive_id",
        "type": "int",
        "doc": "unique ID of the hive where we had the detection"
      },
      {
        "name": "direction",
        "type": "boolean",
        "doc": "true mean the detected object is considered entering, false going out"
      }
    ]
  }
```

schema-value

```
{
    "type": "record",
    "name": "DataValue",
    "namespace": "ipreferwater.todo",
    "fields": [
      {
        "name": "colors",
        "type": {
            "type": "map",
            "values" : "double"
          },
        "doc": "map with the percentage of color found on the object detected"
      },
      {
        "name": "size",
        "type": "double",
        "doc": "size in mm of the object detected"
      },
      {
        "name": "has_wings",
        "type": "boolean",
        "doc": "do the detected object as wings"
      }
    ]
  }
```

Later, we will filter on the insect type "european bee"


#### start

In code, you can adjust
- how much hives you'll have (l69)
```
hivesCoordinates := [4]coordinate{
		{
			x: 160,
			y: 100,
		},
```
-  how many bees will come and leave your hives & how many wasp will come to kill your bees
``` (l39)
func createNewHive(id, beesToAdd, beesToRemove, waspsToAdd int, x, y float64) Hive {
```
-  how many asian-wasp will come to kill your bees

OK, now start the program !
```
go run .
```

Now let's verify our scanner is working.
