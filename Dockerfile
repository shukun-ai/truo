FROM node:18.17.0 AS base
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npx nx reset cache
RUN npx nx run server:build:production
RUN npx nx run server:package

FROM node:18.17.0 AS app
WORKDIR /usr/src/app
COPY --from=base /usr/src/app/dist/installation/server .
EXPOSE 3000
WORKDIR /usr/src/app
ENTRYPOINT ["node", "index.js"]
