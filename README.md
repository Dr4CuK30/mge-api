<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
<a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
<a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

# MGE API

## Descripción
Este proyecto es una API desarrollada como prueba tecnica. A continuación se detallan los pasos para montar el proyecto, incluyendo la configuración del entorno, la ejecución con Docker y la importación de la colección de Postman.

## Requisitos
- Docker
- Docker Compose
- Node.js
- Postman

## Configuración del Entorno
1. Clona el repositorio:
  ```bash
  git clone https://github.com/Dr4CuK30/mge-api
  cd mge-api
  ```

2. Copia el archivo `.env.example` y renómbralo a `.env`:
  ```bash
  cp .env.example .env
  ```

3. Edita el archivo `.env` con las variables de entorno necesarias.

## Ejecución con Docker Compose
1. Construye y levanta los contenedores:
  ```bash
  docker-compose up --build
  ```

2. Para detener los contenedores:
  ```bash
  docker-compose down
  ```

## Importar la Colección de Postman
1. Abre Postman.
2. Haz clic en "Import" en la esquina superior izquierda.
3. Selecciona el archivo de la colección de Postman (`mge-api.postman_collection.json`) y cárgalo.

## Rutas de la API
A continuación se describen las rutas disponibles en la API y sus parámetros:

### User Routes

- **Get User**
  - **URL:** `GET /v1/user`
  - **Description:** Retrieves user information.

- **Create User**
  - **URL:** `POST /v1/user`
  - **Body:**
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```
  - **Description:** Creates a new user.

- **Update Roles**
  - **URL:** `PUT /v1/user/roles`
  - **Body:**
    ```json
    {
      "username": "string",
      "roles": ["string"]
    }
    ```
  - **Description:** Updates user roles.

### Authentication Routes

- **Login**
  - **URL:** `POST /v1/auth/login`
  - **Body:**
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```
  - **Description:** Authenticates a user and returns a JWT into secure cookies.

### Transfer Routes

- **Get Transfers**
  - **URL:** `GET /v1/transfer`
  - **Query Parameters:**
    - `projectId` (number): ID of the project.
    - `organizationalUnitId` (number): ID of the organizational unit.
  - **Description:** Retrieves a list of transfers.

- **Create Transfer**
  - **URL:** `POST /v1/transfer`
  - **Body:**
    ```json
    {
      "vehicleId": number,
      "projectId": number,
      "organizationalUnitId": number,
      "clientId": number,
      "type": "string"
    }
    ```
  - **Description:** Creates a new transfer.

- **Delete Transfer**
  - **URL:** `DELETE /v1/transfer/:transferId`
  - **Description:** Deletes a transfer by ID.

- **Update Transfer**
  - **URL:** `PUT /v1/transfer/:transferId`
  - **Body:**
    ```json
    {
      "vehicleId": number,
      "projectId": number,
      "organizationalUnitId": number,
      "clientId": number,
      "type": "string",
      "transmitterId": number
    }
    ```
  - **Description:** Updates a transfer by ID.

## Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

