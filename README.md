# kadence-orm
Kadence ORM is an object relational mapper for PostgreSQL databases. Additional databases and even APIs will be added soon!

Full documentation can be found at https://kadence-orm.document360.io/docs

# Quick Start Guide

Start interacting with your data in no time!  Add Kadence ORM to an existing Node.js or Typescript project with just a few steps.

## Pre-requisites

In order to successfully use Kadence ORM, you will need the following:

1. An existing Node.js project

2. Node.js installed on your machine

3. An existing database with one or more tables

## Add Kadence ORM to your project

The first step will be installing the Kadence ORM package in your existing project:

1. Navigate to your project directory

2. Add the kadence-orm CLI to your project:

  `$ npm i kadence-orm`

3. Add reflect-metadata to your project:

  `$ npm i reflect-metadata`

4. Add the postgres package to your project:

  `$ npm i pg`

Now Kadence ORM is successfully installed in your project and ready to use.

## Set up your data source

Currently, only PostgreSQL is supported, however we plan to add additional databases and even API support in the future.

### PostgreSQL setup

To setup a connection to your existing PostgreSQL database:

1. Create a .ts file in your project.  The file can be located anywhere in your project and named anything as long as the extension is correct and it is accessible to the files where you will query your data.

2. Create a new KadenceDataSource with your connection information.

  ```
  import { KadenceDataSource } from "kadence-orm";
  
  export const pgDataSource = new KadenceDataSource("postgres", {
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });
  ```

We recommend storing your connection information in a .env file and referencing the .env file variables from your .ts file, but the final design is up to your architectural standards and preferences.

## Define your classes

If you are simply executing raw SQL, this step is not required.  If you wish to use the Kadence ORM client which will return type-safe results, this step is required.

### Define a new class

  ```
  import { Entity, Attribute, Relation, KadenceEntity, LoggingLevel } from "kadence-orm";
  import { pgDataSource } from "./dataSources";
  
  @Entity({ source: pgDataSource, tableName: "employee", uniqueIds: ["id"], loggingLevel: LoggingLevel.Debug })
  export class Employee extends KadenceEntity {
    @Attribute({ type: "uuid })
    id?: string;
    
    @Attribute({ fieldName: "first_name" })
    firstName?: string;
    
    @Attribute({ fieldName: "last_name" })
    lastName?: string;
    
    @Attribute({ fieldName: "employee_id" })
    employeeId?: string;
  }
  ```

## Add to an existing class

To use an existing class:

1. Import the required Kadence ORM objects

  ```
  import { Entity, Attribute, Relation, KadenceEntity, LoggingLevel } from "kadence-orm";
  import { pgDataSource } from "./dataSources";
  ```

2. Extend the class using KadenceEntity

  `export class Employee extends KadenceEntity {}`

3. Add the Entity class decorator (for a full guide to Entity options, see the Classes / Entities article)

  `@Entity({ source: pgDataSource, tableName: "employee", uniqueIds: ["id"], loggingLevel: LoggingLevel.Debug })`

4. Add the Attribute property decorators (for a full guide to Attribute options, see the Properties / Attributes article)

  `@Attribute({ fieldName: "first_name" })`

## Query your database

Use the Kadence ORM client to query the database

Queries must be executed server-side.  To execute a query using Kadence ORM’s client syntax:

1. Create a new Kadence Query using a defined class:

  `const employeeQuery = new KadenceQuery(Employee);`

2. Define and execute your query (for a full guide on query options, see the Read / Select Data article)

  ```
  const result = await employeeQuery
    .addAttributes(["firstName", "lastName", "employeeId"])
    .addExactFilter("employeeId", "62626262")
    .addSort("lastName")
    .addSort("firstName", "DESC")
    .addLimit(7)
    .select();
  ```

## Execute Raw SQL

Alternately, Kadence ORM allows users to execute Raw SQL queries using the executeRawSql command:

  ```
  import { executeRawSql } from "kadence-orm";
  import { pgDataSource } from "./dataSources";
  
  executeRawSql(pgDataSource, "SELECT * FROM employee")
    .then((employees) => {
      console.log(employees);
    });
  ```
