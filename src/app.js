const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('./router');
const notFound = require('./middlewares/notfound');
const error = require('./middlewares/error');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(router.initialize());
app.use(notFound);
app.use(error);

module.exports = app;
