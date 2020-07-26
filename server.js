require('dotenv').load();
const express = require('express'),
    logger = require('./libs/logger'),
    app = express(),
    middlewares = require('./middlewares/common-middleware'),
    port = process.env.APP_API_PORT || 3002,
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

global.jwt = require('jsonwebtoken');

app.use(middlewares.enableCors);

// initiate Logger
logger.initLogger();

// Authenticate Token
app.use(middlewares.authenticate);

const apiRouter = require('./controllers/api');

// log HTTP Request
// app.use(logger.httpLogger);


// just to check our app is up
app.get('/', (req, res) => {
    res.send('This is the api app for GST');
});

// call Requested API
app.use('/api', apiRouter);

// error handle Middleware
app.use(middlewares.errorHandler);

app.listen(port, () => console.log('App booted'));