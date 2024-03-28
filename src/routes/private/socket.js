const express = require('express');
const jwt = require('jsonwebtoken');
const SocketModel = require('../../models/socket');
const authenticate = require('../../middleware/auth')
const router = express.Router();

router.use(authenticate)

function generateToken() {
    const cadenaAleatoria = Math.random().toString(36).substring(2, 16);
    const token = jwt.sign({}, cadenaAleatoria);
    return `socket-${token}`;
}

router.post('/login', async (req, res) => {
    const { username, age, number } = req.body;
    try {
        let usuario = await SocketModel.findOne({ username: username });
        if (!usuario) {
            usuario = new SocketModel({
                username: username,
                email: '',
                age: age,
                bot: [{ number: number, balance: 1000 }],
                socket: []
            });
            await usuario.save();
            res.status(201).json({
                status: 201,
                message: 'Perfil creado correctamente.'
            });
        } else {
            res.status(200).json({
                status: 200,
                message: 'El usuario ya existe.'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            error: 'Error al crear o verificar el perfil.'
        });
    }
});
  
router.post('/socket', async (req, res) => {
    const { username, email, age, valid } = req.body;
    try {

        let token = generateToken()
        let usuario = await SocketModel.findOne({ username: username });
        if (usuario) {
            usuario.email = email;
            usuario.socket.push({ token: token, valid: valid });
        } else {
            usuario = new SocketModel({
                username: username,
                email: email,
                age: age,
                bot: [],
                socket: [{ token: token, valid: valid }]
            });
        }
        await usuario.save();
        res.status(200).json({ 
            status: 200,
            message: 'Perfil actualizado correctamente.' 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            error: 'Error al actualizar el perfil.'
        });
    }
});

router.get('/socket/:token', async (req, res) => {
    const token = req.params.token;
  
    try {
        let decodedToken = token;
        if (token.startsWith('encrypted:')) {
            decodedToken = decryptToken(token.slice(10));
        }
        const usuario = await SocketModel.findOne({ 'socket.token': decodedToken });
        if (!usuario) {
            return res.status(404).json({
                status: 404,
                message: 'Token no válido.'
            });
        }
        const socketEntry = usuario.socket.find(entry => entry.token === decodedToken);
        if (!socketEntry || !socketEntry.valid) {
            return res.status(401).json({
                status: 401,
                message: 'Token no válido.'
            });
        }
        res.status(200).json({
            status: 200,
            message: 'Token válido.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            error: 'Error al verificar el token.'
        });
    }
});
  
router.get('/socket/phone/:number', async (req, res) => {
    const number = req.params.number;
  
    try {
        const usuario = await SocketModel.findOne({ 'bot.number': number }, { 'socket.token': 0 });
        if (!usuario) {
            return res.status(404).json({
                status: 404,
                message: 'Usuario no encontrado.'
            });
        }
        res.status(200).json({
            status: 200,
            usuario
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            error: 'Error al obtener la información del usuario.'
        });
    }
});

router.get('/socket/username/:username', async (req, res) => {
    const username = req.params.username;
  
    try {
        const usuario = await SocketModel.findOne({ username: username }, { 'socket.token': 0 });
        if (!usuario) {
            return res.status(404).json({
                status: 404,
                message: 'Usuario no encontrado.'
            });
        }
        res.status(200).json({
            status: 200,
            usuario
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            status: 500,
            error: 'Error al obtener la información del usuario.'
        });
    }
});
  
router.put('/socket/phone/:number', async (req, res) => {
    const number = req.params.number;
    const { balance, valid } = req.body;
  
    try {
        let usuario = await SocketModel.findOne({ 'bot.number': number });
        if (!usuario) {
            return res.status(404).json({
                status: 404,
                message: 'Usuario no encontrado.'
            });
        }
        const bot = usuario.bot.find(bot => bot.number === number);
        if (!bot) {
            return res.status(404).json({
                status: 404,
                message: 'Bot no encontrado.'
            });
        }
        if (balance !== undefined) {
            bot.balance = balance;
        }
        if (valid !== undefined) {
            bot.valid = valid;
        }
        
        await usuario.save();
        res.status(200).json({
            status: 200,
            message: 'Campo actualizado correctamente.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            error: 'Error al actualizar el campo del usuario.'
        });
    }
});  

module.exports = router;

