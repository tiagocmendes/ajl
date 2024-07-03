FROM node:14

WORKDIR /app

RUN npm install -g serve

RUN npm install -g javascript-obfuscator

RUN npm install

COPY ./ /app/

RUN npm run build

EXPOSE 3000

#CMD ["sh", "-c", "/usr/bin/tail -f /dev/null"]
CMD ["serve","-s","build"]

