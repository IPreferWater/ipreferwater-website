---
title: 'avro schema to curl'
date: '2022-01-01'
component: 'avro-to-schema-curl'
description: 'transform avro-schema to curl for schema-registry'
category: 'code kafka schema-registry'
icon: '/blog/avro-schema-to-curl/icon.webp'
---
```
post SCHEMA_REGISTRY_URL/subjects/SCHEMA_NAME/versions { "schema": "YOUR_SCHEMA_ESCAPED"}
```

This is not pretty yet, but it's working ...

