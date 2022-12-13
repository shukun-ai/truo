# This Dockerfile is only for app server
# TODO: should move it to specific folder for multiple Dockers later
# Prerequisites
# npm run build
# npm run package
# docker run .
FROM node:16.13.2
WORKDIR /usr/src/app
COPY ./dist/installation/server ./installation
EXPOSE 3000
CMD ["node", "./installation/index.js"]
