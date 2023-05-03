# JWT Authentication Service

## Overview
The project is a Node.js backend application that provides RESTful APIs for a shopping platform. The APIs include user registration and login, catalog item retrieval, and product purchase. The application is built with bcrypt for password hashing, express for building the API endpoints, and jsonwebtoken for user authentication.

## Prerequisites
- Node.js v18.13.0 or higher
- PostgreSQL 9.6 or higher

## Installation
1. Install dependencies: `npm install` or `yarn`
2. Copy the `.env.example` file to a new file called `.env`: `cp .env.example .env`
3. Set the environment variables in `.env` file.

## Configuration
The following environment variables must be set in the `.env` file:
- `JWT_SECRET`: A secret key used for signing JWT tokens.
- `NUM_CATALOGS`: How many fake catalogs must be generated.
- `NUM_USERS`: How many fake users must be generated.
- `NUM_ASSETS`: How many fake assets must be generated.
- `NUM_PRODUCTS`: How many fake products must be generated.  
- `PORT`: The port number the service will run on.
- `POSTGRES_USER`: The PostgreSQL database user.
- `POSTGRES_HOST`: The hostname of the PostgreSQL database.
- `POSTGRES_DB`: The name of the PostgreSQL database.
- `POSTGRES_PASS`: The password of the PostgreSQL user.
- `POSTGRES_PORT`: The port number of the PostgreSQL database.

*Note that generated all users have test<number>@gmail.com email and password is repeated <number> for six times*

## Migration info
- To create the users table, you can use the Sequelize CLI. Run the following command:
    - `npx sequelize-cli model:generate --name User --attributes email:string,password:string`
    This will create a new migration file in the /migrations directory with a name like YYYYMMDDHHmmss-create-user.js. You can then run the migration using the following command:
    - `npx sequelize-cli db:migrate`
    This will create the users table in the database specified by your environment variables. Make sure to update the environment variables to match your database configuration before running the migration.