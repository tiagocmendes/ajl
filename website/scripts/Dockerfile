FROM node:14

WORKDIR /app

RUN wget -qO- https://www.mongodb.org/static/pgp/server-7.0.asc | tee /etc/apt/trusted.gpg.d/server-7.0.asc

RUN echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list

RUN apt-get update

RUN apt-get install -y mongodb-mongosh

COPY ./ /app/

RUN npm install node-fetch@2

RUN npm install

CMD ["sh", "-c", "/usr/bin/tail -f /dev/null"]
