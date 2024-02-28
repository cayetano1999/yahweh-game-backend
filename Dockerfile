FROM node:14.16.0-alpine3.10

ARG NPM_TOKEN

# Create app directory

WORKDIR /usr/src/app

# Install app dependencies
RUN npm cache clean --force

COPY package*.json ./

COPY tsconfig.json ./

COPY .npmrc .npmrc

COPY src src

COPY . .
# COPY data data

RUN npm install -g @nestjs/cli

RUN npm install -g typescript

RUN npm install

RUN npm ci --only=production

RUN npm run build

EXPOSE 3000

# Bundle app source

RUN chgrp -R 0 /usr/src/app && \
    chmod -R g=u /usr/src/app

# chown -R $USER .

CMD [ "node", "dist/src/main" ]