---
slug: validator
title: Ajv vs Joi schema validator
authors: sbbeez
tags: [validator, ajv, joi, ajv-joi-comparison, benchmarking]
---

### Introduction

In this Blog, we'll try and compare the difference between two popular choice of schema validators available for javascript. We'll compare the validators in terms of memeory usage, cpu usage, rps/ops (request per second / operations per second), features. All the code samples used to compare are embedded in the blog as well.

<!--truncate-->

### Example Schema

Both Joi and Ajv is easy to user we'll quickly see a example of how the validator code looks like for the below schema,

```js
{
  project_name: "test-project",
  project_description: "description of the project, like what it does and how much is required",
  environment: [
    {
      environment_name: "Production",
      environment_key: "prod",
      environment_description: "This is for prod environment, mainly for customer facing application",
    },
    {
      environment_name: "Development",
      environment_key: "dev",
      environment_description: "This is for dev environment, mainly for developers and testing application",
    },
  ],
};
```

### Ajv

Ajv stands for **Another JSON Schema Validator**, is a popular choice of schema validator, supports Multi-standard in fast and secure manner. It reduces the amount code to be written for validating the schema. Also Ajv is a **JSON** based schema validator.

```js
// setting environment schema
const environmentSchema = {
  type: "object",
  properties: {
    environment_name: {
      type: "string",
      minLength: 3,
      maxLength: 100,
      pattern: "^[A-Za-z][A-Za-z0-9\\.\\s\\-_]+[A-Za-z0-9]+$",
    },
    environment_key: {
      type: "string",
      minLength: 3,
      maxLength: 20,
      pattern: "^[A-Za-z][A-Za-z0-9\\.\\-_]+[A-Za-z0-9]+$",
    },
    environment_description: {
      type: "string",
      nullable: true,
      maxLength: 500,
    },
  },
  required: ["environment_name", "environment_key"],
  additionalProperties: false,
};

// setting up final required schema for testing our input
const ajvSchema = {
  type: "object",
  properties: {
    project_name: {
      type: "string",
      minLength: 3,
      maxLength: 100,
      pattern: "^[A-Za-z][A-Za-z0-9\\.\\s\\-_]+[A-Za-z0-9]+$",
    },
    project_description: {
      type: "string",
      nullable: true,
      maxLength: 500,
    },
    environment: {
      type: "array",
      items: environmentSchema,
      minItems: 1,
    },
  },
  required: ["project_name"],
  additionalProperties: false,
};
```

### Joi

Joi is an another popular choice for schema validation. However unlike Ajv, joi is a **object** based schema validator. Joi is specific to javascript object validations, But Ajv supports cross platform and can be reused. in case of both backend and frontend is javascript. Joi is one not bad choice as it is more intuitive to use.

```js
Joi.object({
  project_name: Joi.string()
    .min(3)
    .max(100)
    .pattern(/^[A-Za-z][A-Za-z0-9.\s\-_]+[A-Za-z0-9]+$/i)
    .required(),
  project_description: Joi.string().max(500).optional(),
  environment: Joi.array()
    .min(1)
    .required()
    .items(
      Joi.object({
        environment_name: Joi.string()
          .min(3)
          .max(100)
          .pattern(/^[A-Za-z][A-Za-z0-9.\s\-_]+[A-Za-z0-9]+$/i)
          .required(),
        environment_description: Joi.string().max(500).optional(),
        environment_key: Joi.string()
          .min(3)
          .max(20)
          .pattern(/^[A-Za-z][A-Za-z0-9\.\-\_]+[A-Za-z0-9]+$/i)
          .required(),
      })
    ),
});
```

### Feature Comparison

| Ajv                                                                       | Joi                                    |
| ------------------------------------------------------------------------- | -------------------------------------- |
| Json schema based                                                         | Javascript object based                |
| Cross platform                                                            | Specific to javascript                 |
| requires compliation, using compiled version gives huge performance boost | doesn't require compile                |
| supports locale and mature multi-language support                         | still in roadmap not readily available |
| readily available extension packages in node.js (ajv-errors, etc.)        | in-built with Joi                      |
| unpacked size: **1.01 MB**                                                | unpacked size: **516 kB**              |
| Supports Async validation                                                 | supports Async validation              |
| Returns all errors by default if ajv-errors extension package is used     | supports first or all error            |
| Supports remote schema fetching                                           | Doesn't support remote schemaa         |

### Benchmark results:

_Performance_:
When it comes performance, Ajv is unbeatable. Please find the below stats in terms of ops/sec (operations per second). Please find the github's gist for benchmark code.

```
==============
  ajv-vs-joi
==============

Platform info:
==============
   Darwin 17.7.0 x64
   Node.JS: 12.20.2
   V8: 7.8.279.23-node.45
   CPU: Intel(R) Core(TM) i5-5350U CPU @ 1.80GHz × 4
   Memory: 8 GB

Suite: Benchmark comparsion between validators
✔ Joi            35,924 rps
✔ ajv           710,581 rps

   Joi       -94.94%         (35,924 rps)   (avg: 27μs)
   ajv (#)        0%        (710,581 rps)   (avg: 1μs)
-----------------------------------------------------------------------
```

_Note_: in case of using ajv with ajv-errors, it is not allowed to return just the first error hence all the errors are returned and above _rps_ stat is for all the error return.

_Memory and CPU Usage_:

| Stat                    | Ajv               | Joi               |
| ----------------------- | ----------------- | ----------------- |
| Memeory usage (average) | 7.15 MB           | 4.75 MB           |
| CPU usage (average)     | 12.5 milliseconds | 12.5 milliseconds |

### Code samples

1. ops/second is calcualted using "benchmarkify" - [example](https://gist.github.com/sbbeez/6c8ceb3d54aa725c689d9143d3cd2ed6)
2. Ajv memory and cpu usage stats - [example](https://gist.github.com/sbbeez/7614ee5fb14cbfecc2544d818cbbcc40)
3. Joi memory and cpu usage stats - [example](https://gist.github.com/sbbeez/fec324f45d838bdd8722fc584434afb0)

### Conclusion

Looking at the stats, features availability, performance. Ajv is a go to choice. in case, your application has to be extremely memory optimized or needs easy syntax Joi seems to be a good choice as it is much intuitive to use and consumes less memory.
