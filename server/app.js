const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/index');

const app = express();
const {MONGO_URI} = config;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connection Success"))
    .catch((e) => console.log(e));

app.get('/');

module.exports = app;