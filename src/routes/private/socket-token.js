const express = require('express');
const Token = require('../../models/socket-token');
const authenticate = require('../../middleware/auth')
const router = express.Router();

router.use(authenticate)

router.post('/generate', authenticate, async (req, res) => {
    const { user, tipo, duracion } = req.body;
    let expiracion;
    if (tipo === 'suscripcion') {
        expiracion = new Date();
        expiracion.setHours(expiracion.getHours() + duracion); 
    }
    const token = new Token({
        token: 'socket-' + Math.random().toString(36).substr(2, 16),
        user,
        tipo,
        expiracion
    });
    await token.save();
    res.json({ token: token.token });
});

router.get('/info/:token', authenticate, async (req, res) => {
    const { token } = req.params;
    const tokenData = await Token.findOne({ token });
    if (!tokenData) {
        return res.status(404).json({ message: 'Token no encontrado' });
    }
    let expirado = false;
    if (tokenData.tipo === 'suscripcion' && tokenData.expiracion < new Date()) {
        expirado = true;
    }
    res.json({
        user: tokenData.user,
        tipo: tokenData.tipo,
        expirado
    });
});

module.exports = router;

