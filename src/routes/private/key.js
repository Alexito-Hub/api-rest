const express = require('express');
const router = express.Router();

const DATA_KEY_DB = require('../../models/key');

router.get('/', async (req, res) => {
    try {
        const keys = await DATA_KEY_DB.find()
        res.status(200).json({
            status: 200,
            keys
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
        const key = await DATA_KEY_DB(req.body);
        await key.save();
        res.status(201).json({
            status: 201,
            key
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
        const key = await DATA_KEY_DB.findById(req.params.id);
        res.status(200).json({
            status: 200,
            key
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
        const key = await DATA_KEY_DB.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 200,
            key
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            error: error.message
        });
    }
});

module.exports = router;