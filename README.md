<h1 align="center">
  SHUKUN AI
</h1>

The SHUKUN Platform is a low-code development platform designed with features like metadata management, unified API interfaces, a permissions gateway, and a generative admin backend.

This project has been in development for three years and is already running stably across multiple production projects. We’re now open-sourcing it and will continue to update it regularly.

However, as an open-source project, it’s still in its early stages—currently at version 2.0.0-alpha. The stable 2.0.0 release will come after we finalize some experimental interfaces and add sufficient documentation. If you’re interested in the project, feel free to reach out to me at chase_wu@shukun.work.

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
- Admin Management: apps/client

## JSON Schema and Validation Tools

> Generate typescript from libs/schema

```bash
# Start server
npx nx run schema:generate
```
