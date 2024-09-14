FROM node:19-alpine3.16

RUN npm install -g pnpm
RUN apk add python3 make g++

WORKDIR /app

COPY ./env/.env /app/env/.env

COPY entry.sh /tmp/

ENTRYPOINT [ "sh", "/tmp/entry.sh" ]
