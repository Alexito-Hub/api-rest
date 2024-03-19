
const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        enum: ['premium', 'suscripcion'],
        required: true
    },
    expiracion: {
        type: Date, 
        required: function() {
            return this.tipo === 'suscripcion';
        }
    }
},  { collection:'Socket-Token', versionKey: false});

tokenSchema.pre('validate', function(next) {
    if (this.tipo === 'premium') {
        this.expiracion = undefined;
    }
    next();
});

const Token = mongoose.model('Socket-Token', tokenSchema);

module.exports = Token;
