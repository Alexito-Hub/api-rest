const mongoose = require('mongoose')
const Schema = mongoose.Schema

const comments_lu = new Schema({
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
}, { collection:'Luciana', versionKey: false})


const COMMENTS_USER_LU = mongoose.model('Luciana', comments_lu)
module.exports = COMMENTS_USER_LU