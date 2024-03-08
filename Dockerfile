FROM node:14.16.0-alpine3.10
 
ARG NPM_TOKEN
 
# Create app directory
 
WORKDIR /usr/src/app
 
COPY package*.json ./
COPY tsconfig.json ./
COPY . .

RUN npm install -g typescript
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