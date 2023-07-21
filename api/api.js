const express = require('express');
const cors = require('cors');

const logRoutes = require('./middleware/logger');

const api = express();

api.use(cors());
api.use(express.json());
api.use(logRoutes);

module.exports = api;