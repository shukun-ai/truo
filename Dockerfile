FROM node:18.17.0 AS platform
WORKDIR /usr/src/app
COPY dist/installation/server .
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
COPY dist/apps/client/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
