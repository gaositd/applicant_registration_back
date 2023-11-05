### UJED Prescriptions API - NestJS

## Description

API para el servicio de preinscripciones de la UJED (Universidad Juárez del Estado de Durango)

## Installation

Los paquetes están manejados por pnpm, por lo que se debe instalar primero

```bash
$ npm install -g pnpm
```

Y luego instalar los paquetes de la aplicación

```bash
$ pnpm install
```

## Configuration

Se debe crear un archivo .env en la raíz del proyecto con las siguientes variables de entorno

```bash
 $ cp .env.example .env
```

Al completar el proceso se debe de correr los contenedores de docker

```bash
$ docker-compose up -d

# opcionalmente se puede correr solo postgres

$ docker-compose up -d postgres
```

## Migrations

Se debe de correr las migraciones para crear las tablas en la base de datos

```bash
$ pnpm run migration:up
```

## Seeders

Se debe de correr los seeders para poblar las tablas de la base de datos

```bash
$ pnpm run db:seed:up
```

Esto va a crear un usuario administrador y una secretaria con las siguientes credenciales

```bash
# Admin
Matricula: DCM3ZAIFjYF3
password: admin

# Secretaria
Matricula: YgvInAxNrBDg
password: secretaria
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Jonathan Marquez](https://www.github.com/z0m0dan)

## License

Nest is [MIT licensed](LICENSE).
