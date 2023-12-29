const express = require("express");
const mongoose = require('mongoose');
const axios = require('axios');
const dotenv = require("dotenv");
const cors = require('cors')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const routes =require('./routes')

const app = express();
dotenv.config();

const MongoDb_Connection = process.env.DB_CONNECTION;
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors())

mongoose.connect(MongoDb_Connection);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDb is failed to Connect"))
db.once('open', () => {
    console.log(" MongoDB  is connect Successfully");
})

app.get('/', (req, res) => {
    res.send("Hello World");
})

app.use('/api', routes);

app.listen(PORT, () => {
    console.log("Server is running on port 2000")
})
