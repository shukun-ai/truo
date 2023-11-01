<h1 align="center">
  Shukun System (SS)
</h1>

## How to Develop and Debug

1. Start the Backend and Frontend project.

```shell
npm start
```

2. Start VSCode attach
   1. Attach Server
   2. Launch Chrome

## Introduction

This project uses Nx to manage multiple applications in a repo.

- JSON Schema and Validation Tools: libs/schema
- Runtime Server: apps/server
- Dashboard Management: apps/client
- Editor: -
- Gateway Compose: -
- Runtime Compose: apps/daily-build

## JSON Schema and Validation Tools

> Run generate locally

```bash
# Start server
npx nx run schema:generate
```

> Deploy

Please see Github Action scripts (.github/workflows/lib-schema-publish.yml).

## Runtime Server

> Run locally

```bash
# Start server
npx nx run server:serve
```

```bash
# Build locally
npx nx run server:build:production
```

> Deploy

Please see Github Action scripts (.github/workflows/app-server-daily-build.yml and .github/workflows/compose-daily-build.yml).

## Dashboard Management

> Run locally

```bash
# Start server
npx nx run client:serve
```

```bash
# Build locally
npx nx run client:build:production
```

> Deploy

Please see Github Action scripts (.github/workflows/compose-daily-build.yml).

## Runtime Compose

> Deploy

Please see Github Action scripts (.github/workflows/compose-daily-build.yml).
