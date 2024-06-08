FROM node:18.17.0 AS base
WORKDIR /usr/src/app
COPY . .
RUN npm ci
RUN npx nx reset cache
RUN npm run build
RUN npx nx run server:package

FROM node:18.17.0 AS platform
WORKDIR /usr/src/app
COPY --from=base /usr/src/app/dist/installation/server .
EXPOSE 3000
WORKDIR /usr/src/app
ENTRYPOINT ["node", "index.js"]

FROM node:18.17.0 AS hub
WORKDIR /usr/src/app
COPY --from=base /usr/src/app/dist/apps/client/ .
EXPOSE 3000
WORKDIR /usr/src/app
RUN npm install -g local-web-server
ENTRYPOINT ["ws", "-p", "3000", "--spa", "index.html"]
