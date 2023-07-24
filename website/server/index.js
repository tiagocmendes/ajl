const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/', routes);

app.listen(8080, () => {
  console.log('Server started on port 8080');
});