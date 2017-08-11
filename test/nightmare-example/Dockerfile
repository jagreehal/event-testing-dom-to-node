FROM node:8

# Installing the packages needed to run Nightmare
RUN apt-get update &&\
    apt-get install -y libgtk2.0-0 libgconf-2-4 \
    libasound2 libxtst6 libxss1 libnss3 xvfb

RUN rm -rf /tmp/.X9-lock 2> /dev/null

ENV HOME "/usr/app"

RUN mkdir -p ${HOME}
WORKDIR ${HOME}

COPY package.json .

RUN NODE_ENV=production

RUN npm install

# RUN adduser -D app 
# USER app

COPY entrypoint.sh /entrypoint
RUN chmod +x /entrypoint
ENTRYPOINT ["/entrypoint"]

CMD npm test