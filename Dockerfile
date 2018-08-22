FROM jshimko/meteor-launchpad:latest

RUN mkdir /meteorapp

WORKDIR /meteorapp

ADD . /app

RUN cd app/

RUN meteor npm install

RUN meteor build ../build --directory

RUN cd ../build/bundle/programs/server

RUN npm install

RUN npm install -g forever

EXPOSE 82

ENV PORT 82

CMD ["forever", "--minUptime", "1000", "--spinSleepTime", "1000", "./main.js"]