FROM mhart/alpine-node:8

RUN mkdir -p /usr/app

WORKDIR /usr/app

COPY package.json .
RUN NODE_ENV=production

RUN npm install

ENV HOST "0.0.0.0"
ENV PORT 80
EXPOSE 80

COPY . .

CMD ["npm", "start" ]