const express = require('express');
const cors = require('cors');

const logRoutes = require('./middleware/logger');
const userRouter = require('./routes/user')

const api = express();

api.use(cors());
api.use(express.json());
// api.use(logRoutes);

api.get('/', (req,res) => {
    res.status(200).send("Welcome to the Prokastimon App")
})

api.use('/users', userRouter)

module.exports = api;
