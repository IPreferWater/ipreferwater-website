---
title: 'Oyster-guardian'
date: '2022-12-01'
description: 'MQTT Protocol for monitoring an oyster farm'
category: 'code mqtt golang'
icon: '/blog/oyster-guardian/icon.webp'
---

![gendarme](/blog/oyster-guardian/gendarme.webp)
### Context
During the winter months, oyster farms are at an increased risk of theft due to the chrismath feast. In addition, oyster thieves may be more motivated to steal during the winter when there is less activity and less of a chance of being caught.

We need a protocol to receive informations from sensors and alert in case of threats.

### Functionnal Explications
The [github](https://github.com/IPreferWater/oyser-guardian) with the source.

Imagine a device with a camera that track the entry of your farm.

In our app :
- subscribe to a topic to get item detected in JSON (payload)
- we use an IA model that recognised what's on the picture
- we use an algo to estimate a threat point
- if the threat is too hight, we send our payload to another topic
- we save the payload in db for history

![fonctional schema](/blog/oyster-guardian/miro_fonctional_schema.webp)


- I used [Paho](https://github.com/eclipse/paho.mqtt.golang) for MQTT library
- [Mosquitto](https://hub.docker.com/r/vimagick/mosquitto) for the MQTT Broker
- [Mongo](https://hub.docker.com/_/mongo) to store history


### Technicals explications

#### requierements
you need
- [docker](https://docs.docker.com/get-docker/) to start MQTT Broker, Mongo DB

### MQTT

An MQTT broker is a server that receives and sends messages between clients, allowing them to communicate with each other and exchange data over a network.

When subscribing to a topic you can define the QOS (Quality of Service) 
It refers to the level of guarantee that a message will be delivered from the sender to the receiver. There are three levels:

**QoS 0 (At Most Once)**: Message may not be delivered but it's quick to consume.

*Example: you want to consume from temperature sensor and need to make an average over the day*


**QoS 1 (At Least Once)**: Message will be delivered at least once but it might be consume multiple times.

*Example your app check if the temperature is too hight, it's ok to read twice the message, but critical if you miss the information ...*

**QoS 2 (Exactly Once):** It's the slowest consume, but you can assume you will not miss the message and consume only once

*Example someone has entered your farm, we can't miss this info & can't read it twice or we might think there is 2 intrusions ...*

Because we don't want to miss any burglar, we choose the **QOS 2** !

#### start the environnement

```
docker-compose up -d mongo
docker-compose up -d mosquitto
docker-compose up -d app
```

#### test app

To mock the device you can use this simple endpoint that will publish to the topic **DETECTED** a detection

```
curl --location --request POST 'localhost:3001/mock-detected'
```

this endpoint publish on the topic **DETECTED** this payload
```
{
  "sensorName": "Road X",
  "x": 49.7549872844638,
  "y": 0.35485002847631275,
  "imageUrl": "url/of/image/take",
  "timestamp": "2022-12-29 15:32:44"
}
```

Your app is subscribed to the topic **DETECTED**, you should see in the logs that he received the dection

```
level=info msg="topic oyster-guardian/detected consume message {\"sensorName\":\"Road X\",\"x\":49.7549872844638,\"y\":0.35485002847631275,\"imageUrl\":\"url/of/image/take\",\"timestamp\":\"2022-12-29 15:32:44\"}"
```
then your app 
- transform the json to an object with [marshall](https://github.com/IPreferWater/oyster-guardian/blob/main/go/service/oyster-guardian.go#L13)
- get the type of detection form the image (currently it [return only HUMAN_PACK](https://github.com/IPreferWater/oyster-guardian/blob/main/go/service/image-recognition.go#L13))
```
level=info msg="analysing img with url url/of/image/take"
level=info msg="type detected is human pack"
```
because the threat point is too hight, we [publish to the topic **THREAT**](https://github.com/IPreferWater/oyster-guardian/blob/main/go/service/oyster-guardian.go#L25)


```
level=info msg="topic oyster-guardian/threat consume message {\"sensorName\":\"Road X\",\"x\":49.7549872844638,\"y\":0.35485002847631275,\"imageUrl\":\"url/of/image/take\",\"timestamp\":\"2022-12-29 15:32:44\"}"
level=info msg="ALERT ! There might be a threat on your farm on the location => {\"sensorName\":\"Road X\",\"x\":49.7549872844638,\"y\":0.35485002847631275,\"imageUrl\":\"url/of/image/take\",\"timestamp\":\"2022-12-29 15:32:44\"}"
```

this was a really simple application using MQTT and an idea on where it could be usefull