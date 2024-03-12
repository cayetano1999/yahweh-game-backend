FROM node:14.16.0-alpine3.10

ARG NPM_TOKEN

# Create app directory

WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Bundle app source

RUN chgrp -R 0 /usr/src/app && \
    chmod -R g=u /usr/src/app

# chown -R $USER .

CMD [ "node", "dist/src/main" ]