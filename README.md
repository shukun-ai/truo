# Shukun Low-code platform

This project uses Nx.dev to manage multiple applications in a repo.

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
