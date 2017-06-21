FROM mhart/alpine-node:8

RUN mkdir -p /usr/src

# RUN adduser -S nodejs
# RUN chown nodejs: /usr/src
# USER nodejs

WORKDIR /usr/src

COPY package.json .
RUN NODE_ENV=production

RUN npm install --only=production

ENV HOST "0.0.0.0"
ENV PORT 9999
EXPOSE 9999

COPY . .

CMD ["npm", "start" ]