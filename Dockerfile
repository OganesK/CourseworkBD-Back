FROM node:12-alpine
RUN apk add openssl
RUN apk add --no-cache python3 g++ make

WORKDIR /app

COPY package.json yarn.lock ./

RUN apk --no-cache --virtual build-dependencies add \
        python3 \
        make \
        g++
RUN yarn install --production


RUN npx prisma init
RUN npx prisma generate

COPY . .

EXPOSE 4000

CMD node dist/server.js