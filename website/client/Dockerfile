FROM node:14

WORKDIR /app

COPY ./ /app/

RUN npm install -g serve

RUN npm install -g javascript-obfuscator

RUN npm install

RUN npm run build

EXPOSE 3000

#CMD ["sh", "-c", "/usr/bin/tail -f /dev/null"]
CMD ["serve","-s","build"]

