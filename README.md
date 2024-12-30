# MGE API

## Descripción
Este proyecto es una API desarrollada como prueba tecnica. A continuación se detallan los pasos para montar el proyecto, incluyendo la configuración del entorno, la ejecución con Docker y la importación de la colección de Postman.

## Caracteristicas

- Aplicación construida con NestJS y TypeORM.
- Sincronización de entidades en código con la base de datos conectada (no se usaron migraciones).
- Seguridad de los endpoints de transferencias con JWT, Cookies Seguras y Guards de validación de distintos permisos (Unidad organizacional, roles, permisos y proyectos).
- Cache de peticiones GET por 1 minuto usando REDIS
- Headers de seguridad aplicados con ayuda de helmet
- Respuestas y codigos de error estandarizados.

## Requisitos
- Docker
- Docker Compose
- Node.js
- Postman

## Levantamiento servicios necesarios con Docker Compose
1. Construye y levanta los contenedores:
  ```bash
  docker-compose up --build
  ```

2. Para detener los contenedores:
  ```bash
  docker-compose down
  ```

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

4. Ejecuta la instalación de dependencias:
  ```bash
  npm install
  ```

5. Ejecuta el proyecto:
  ```bash
  npm run start:dev
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

