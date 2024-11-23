FROM node:20-alpine as deps

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

FROM node:20-alpine as build

WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules ./node_modules

COPY . .

# RUN npm run test
RUN npm run build

RUN npm ci -f --omit=dev && npm cache clean --force

FROM node:20-alpine as prod

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

ENV NODE_ENV=production
ENV TZ=America/Santo_Domingo

USER node

EXPOSE 3000

CMD [ "node", "dist/src/main.js" ]