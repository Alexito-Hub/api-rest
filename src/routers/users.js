const { Router } = require('express');
const router = new Router();

const User = require('../models/user');

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            creator: 'Zio',
            status: 200,
            users: users
        });
    } catch (e) {
        res.status(500).json({
            creator: 'Zio',
            status: 500,
            error: '[!] Parece que hubo un problema'
        });
    }
});

module.exports = router