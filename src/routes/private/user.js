const express = require('express');
const router = express.Router();

const DATA_USER_DB = require('../../models/user');

router.get('/', async (req, res) => {
    try {
        const users = await DATA_USER_DB.find();
        res.status(200).json({
            status: 200,
            users
        });
    } catch (error) {
        res.status(500).json({ 
            status: 500,
            error: error.message
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await DATA_USER_DB.findById(req.params.id);
        res.status(200).json({
            status: 200,
            user
        });
    } catch (error) {
        res.status(500).json({ 
            status: 500,
            error: error.message
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const user = await DATA_USER_DB.create(req.body);
        res.status(200).json({
            status: 200,
            user
        });
    } catch (error) {
        res.status(500).json({ 
            status: 500,
            error: error.message
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const user = await DATA_USER_DB.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            status: 200,
            user
        });
    } catch (error) {
        res.status(500).json({ 
            status: 500,
            error: error.message
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const user = await DATA_USER_DB.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 200,
            user
        });
    } catch (error) {
        res.status(500).json({ 
            status: 500,
            error: error.message
        });
    }
});

module.exports = router;