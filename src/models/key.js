const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const keySchema = new Schema({
    key: {
        type: String,
        required: true
    },
    limit: {
        type: Number,
        required: true
    }
}, { collection: 'Key', versionKey: false });

const DATA_KEY_DB = mongoose.model('Key', keySchema);
module.exports = DATA_KEY_DB;