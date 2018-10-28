const mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Define schema
var SomeModelSchema = new Schema({
    name: String,
    price: Number,
    gstPercentage: Number
});

const getModel = function(tableName) {
return mongoose.model(tableName, SomeModelSchema);
}
module.exports = getModel;