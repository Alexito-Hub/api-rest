const mongoose = require('mongoose')
const Schema = mongoose.Schema

const comments_jamie = new Schema({
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    },
    replyMsg: [{
        name: {
            type: String,
            required: true
        },
        comment: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        },
        likes: {
            type: Number,
            default: 0
        }
    }]
}, { collection:'Jamie', versionKey: false})


const COMMENTS_USER_JAMIE = mongoose.model('Jamie', comments_jamie)
module.exports = COMMENTS_USER_JAMIE