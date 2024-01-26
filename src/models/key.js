const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const keySchema = new Schema({
    _id: String,
    key: String,
    limit: Number
});

const DATA_KEY_DB = mongoose.model('keys', keySchema);

module.exports = DATA_KEY_DB;