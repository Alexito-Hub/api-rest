const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    description: {
        type: String,
        maxlength: 500 // Limita la longitud de la descripción
    },
    profilePicture: {
        type: String,
        validate: {
            validator: value => /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(value), // Validador de URL
            message: 'Formato de URL no válido'
        }
    },
    verified: {
        type: Boolean,
        default: false
    },
    followers: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    following: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    settings: [{
        theme: {
            type: String,
            enum: ['light', 'dark'],
            default: 'light'
        },
        language: {
            type: String,
            default: 'en'
        }
    }],
    posts: [{
        postId: {
            type: Schema.Types.ObjectId,
            default: mongoose.Types.ObjectId
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        },
        media: {
            type: String,
            validate: {
                validator: value => /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(value), // Validador de URL
                message: 'Formato de URL no válido'
            }
        },
        likes: [{
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        }],
        comments: [{
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            content: {
                type: String,
                required: true
            },
            timestamp: {
                type: Date,
                default: Date.now
            },
            likes: [{
                user: {
                    type: Schema.Types.ObjectId,
                    ref: 'User'
                }
            }]
        }]
    }]
}, { collection: 'User', versionKey: false });

const DATA_USER_DB = mongoose.model('User', userSchema);

module.exports = DATA_USER_DB;
