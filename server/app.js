const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/index');
const hpp = require("hpp");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const {MONGO_URI} = config;

// Routes
const postsRoutes = require('./routes/api/post');
const userRoutes = require('./routes/api/user');


app.get(hpp());
app.use(helmet());
app.use(cors({origin: true, credentials: true}));
app.use(morgan("dev"))
app.use(express.json())

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log("MongoDB connection Success"))
    .catch((e) => console.log(e));

// Use routes
app.get('/');
app.use('/api/post', postsRoutes);
app.use('/api/user', userRoutes);

module.exports = app;