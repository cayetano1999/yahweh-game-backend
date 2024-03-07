FROM node:14.16.0-alpine3.10

ARG NPM_TOKEN

# Create app directory
WORKDIR /usr/src/app

# COPY data data
COPY package*.json ./
COPY tsconfig.json ./
COPY . .

RUN npm install -g typescript

RUN npm install

RUN npm run build

EXPOSE 8080

# Bundle app source

RUN chgrp -R 0 /usr/src/app && \
    chmod -R g=u /usr/src/app

CMD [ "node", "dist/app.js" ]