const mongoose = require('mongoose');
const crypto = require('crypto');

function encryptToken(token) {
    const key = crypto.createSecretKey(crypto.randomBytes(32));
    const cipher = crypto.createCipheriv('aes-256-cbc', key, Buffer.alloc(16, 0));
    let encrypted = cipher.update(token, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

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
    }],
    socket: [{
        token: {
            type: String,
        },
        valid: {
            type: Boolean,
        }
    }]
}, { collection: 'Socket', versionKey: false });

SocketSchema.pre('save', function (next) {
    this.socket.forEach(entry => {
        if (entry.token && !entry.token.startsWith('encrypted:')) {
            entry.token = `encrypted:${encryptToken(entry.token)}`;
        }
    });
    next();
});

const SocketModel = mongoose.model('Socket', SocketSchema);

module.exports = SocketModel;
