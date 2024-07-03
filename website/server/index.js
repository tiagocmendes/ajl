const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const routes = require('./routes');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
	req.wss = wss;
	next();
});

app.use('/', routes);

server.listen(8080, () => {
	console.log('Server started on port 8080');
});
