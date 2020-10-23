const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/index');
const hpp = require("hpp");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const app = express();
const {MONGO_URI} = config;

const prod = process.env.NODE_ENV === 'production';

// Routes
const postsRoutes = require('./routes/api/post');
const userRoutes = require('./routes/api/user');
const authRoutes = require('./routes/api/auth');
const searchRoutes = require('./routes/api/search');

app.set("etag", false);
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
app.use('/api/post', postsRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/search', searchRoutes);

if (prod) {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    })
}

module.exports = app;