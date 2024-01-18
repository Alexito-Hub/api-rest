const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    premium: { type: Boolean, default: false },
    limit: { type: Number, default: 0 },
    games: { type: [String], default: [] }
});

const User = mongoose.model('User', userSchema);

module.exports = User;