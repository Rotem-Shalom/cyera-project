# Microservices System

# services

- User Service: manages users
- Order Service: manages orders
- Auth Service: issues and validates JWT tokens
- Gateway Service: API gateway that verifies JWT tokens and forwards requests

## Prerequisites

- Docker
- Docker Compose

## To build and start all services:

```bash
docker compose up --build
```

## To stop all services and delete volumes:

```bash
docker compose down -v
```

## To build and start all services including automated tests:

```bash
docker compose --profile test up --build --exit-code-from tester
```
