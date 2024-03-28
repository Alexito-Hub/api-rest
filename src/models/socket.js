const mongoose = require('mongoose');

const SocketSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    age: {
        type: Number,
    },
    bot: [{
        number: {
            type: Number
        },
        balance: {
            type: Number,
            default: 0
        },
    }, { _id: false }],
    socket: [{
        token: {
            type: String,
        },
        valid: {
            type: Boolean,
        }
    }, { _id: false }]
}, { collection: 'Socket', versionKey: false });

const SocketModel = mongoose.model('Socket', SocketSchema);

module.exports = SocketModel;
