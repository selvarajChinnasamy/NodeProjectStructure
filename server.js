require('dotenv').load();
const express = require('express'),
    logger = require('./libs/logger'),
    app = express(),
    middlewares = require('./middlewares/common-middleware'),
    port = process.env.APP_API_PORT || 3002,
    bodyParser = require('body-parser');

app.use(bodyParser.json());


app.use(middlewares.enableCors);

// initiate Logger
logger.initLogger();

const apiRouter = require('./controllers/api');

// log HTTP Request
app.use(logger.httpLogger);

// Authenticate Token
app.use(middlewares.authenticate);


// just to check our app is up
app.get('/', (req, res) => {
    res.send('This is the api app for GST');
});

// call Requested API
app.use('/api', apiRouter);

// error handle Middleware
app.use(middlewares.errorHandler);

app.listen(port, () => console.log('App booted'));

module.exports = app;