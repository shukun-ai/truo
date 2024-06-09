FROM node:18.17.0 AS base
WORKDIR /usr/src/app
COPY . .
ENV VITE_CLIENT_BASE_URL=
ENV VITE_CLIENT_STORAGE_URL=
ENV VITE_CLIENT_ASSET_URL=
ENV VITE_CLIENT_PUBLIC_PATH=
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

FROM nginx:1.21.1 AS hub
RUN echo 'server {\n\
    listen       80;\n\
    listen  [::]:80;\n\
    server_name  localhost;\n\
    location / {\n\
        root   /usr/share/nginx/html;\n\
        index  index.html index.htm;\n\
        try_files $uri /index.html;\n\
        add_header Cache-Control "public, no-cache";\n\
    }\n\
    error_page   500 502 503 504  /50x.html;\n\
    location = /50x.html {\n\
        root   /usr/share/nginx/html;\n\
    }\n\
}' > /etc/nginx/conf.d/default.conf
COPY --from=base /usr/src/app/dist/apps/client/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
