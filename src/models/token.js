const mongoose = require('mongoose')
const Schema = mongoose.Schema

const token = new Schema({
    name: {
        type: String,
        required: true
    },
    apikey: {
        type: String,
        required: true
    }
}, { collection:'Token', versionKey: false, _id: false})


const DATA_TOKEN_DB = mongoose.model('Token', token)
module.exports = DATA_TOKEN_DB