const mongoose = require('mongoose'),
     mongoDB = process.env.DB_HOSTNAME;
     getModel = require('../libs/product.schema'),
     fs = require('fs'),
     path = require('path');

global.connection = undefined;

const db = {};

try {
    global.connection = mongoose.connect(mongoDB);
    global.connection.insertQuery = function (tableName, value) {
        return new Promise((resolve, reject) => {
            new getModel(tableName)(value).save(function (err, data) {
                if (err) {
                    return reject(err);
                }
                return resolve(data);
            });
        });
    }
    global.connection.getQuery = function (tableName) {
        return new Promise((resolve, reject) => {
            new getModel(tableName).find(function (err, data) {
                if (err) {
                    return reject(err);
                }
                return resolve(data);
            });
        });
    }
    global.logger.info('DB connection established');
} catch (err) {
    global.logger.info(err);
    throw Error(err);
}

fs.readdirSync(__dirname).filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js')).forEach((file) => {
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
});

module.exports = db;
