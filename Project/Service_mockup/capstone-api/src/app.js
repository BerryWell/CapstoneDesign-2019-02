const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const port = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

exports.app = app;
exports.port = port;
