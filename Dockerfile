FROM node:14-slim AS build

WORKDIR /usr/build

COPY package.json yarn.lock ./
COPY server/package.json ./server/
RUN yarn --frozen-lockfile

COPY . ./
RUN yarn build

FROM node:14-slim

WORKDIR /usr/app

COPY package.json yarn.lock ./
COPY server/package.json ./server/
RUN yarn --frozen-lockfile --production

COPY --from=build /usr/build/dist ./dist

CMD [ "yarn", "start:prod" ]
